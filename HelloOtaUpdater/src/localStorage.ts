
import 'dotenv/config';

import {
  createStorageAdapter,
  createStorageKeyBuilder,
  createStorageUri,
  parseStorageUri,
} from '@hot-updater/plugin-core';

import {
  mkdir,
  stat,
  rename,
  rm,
} from 'node:fs/promises';

import {
  createReadStream,
  createWriteStream,
} from 'node:fs';

import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {dirname, extname, resolve, sep} from 'node:path';
import {randomUUID} from 'node:crypto';

const PROTOCOL = 'local-ota';
const BUCKET = 'bundles';

export function localStorage() {
  const root = resolve(
    process.env.OTA_STORAGE_DIR ??
      '/home/joon/work/HelloOtaStorage/bundles',
  );

  const baseUrl = process.env.OTA_DOWNLOAD_BASE_URL;

  if (!baseUrl) {
    throw new Error('OTA_DOWNLOAD_BASE_URL is required');
  }

  if (!['http:', 'https:'].includes(new URL(baseUrl).protocol)) {
    throw new Error('Invalid OTA download URL');
  }

  const buildKey = createStorageKeyBuilder(undefined);

  const keyOf = (storageUri: string) => {
    const parsed = parseStorageUri(storageUri, PROTOCOL);

    if (parsed.bucket !== BUCKET) {
      throw new Error('Invalid storage bucket');
    }

    return parsed.key;
  };

  const fileOf = (key: string) => {
    const path = resolve(root, key);

    if (!path.startsWith(root + sep)) {
      throw new Error('Invalid storage path');
    }

    return path;
  };

  return createStorageAdapter({
    name: 'localStorage',
    protocol: PROTOCOL,

    // 파일 저장
    async put({key, body}) {
      const storedKey = buildKey(key);
      const file = fileOf(storedKey);
      const temp = `${file}.${randomUUID()}.tmp`;

      await mkdir(dirname(file), {recursive: true});

      try {
        await pipeline(
          Readable.fromWeb(body as any),
          createWriteStream(temp, {
            flags: 'wx',
            mode: 0o600,
          }),
        );

        await rename(temp, file);
      } catch (error) {
        await rm(temp, {force: true});
        throw error;
      }

      return {
        storageUri: createStorageUri({
          protocol: PROTOCOL,
          bucket: BUCKET,
          key: storedKey,
        }),
      };
    },

    // 파일 조회
    async get({storageUri}) {
      const file = fileOf(keyOf(storageUri));

      let info;

      try {
        info = await stat(file);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          return {response: null};
        }
        throw error;
      }

      if (!info.isFile()) {
        return {response: null};
      }

      const ext = extname(file).toLowerCase();

      const contentType =
        ext === '.json' ? 'application/json' :
        ext === '.js' ? 'text/javascript' :
        ext === '.png' ? 'image/png' :
        ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
        ext === '.webp' ? 'image/webp' :
        'application/octet-stream';

      return {
        response: new Response(
          Readable.toWeb(createReadStream(file)) as ReadableStream,
          {
            headers: {
              'Content-Type': contentType,
              'Content-Length': String(info.size),
            },
          },
        ),
      };
    },

    // 다운로드 주소 생성
    async getDownloadUrl({storageUri}) {
      const key = keyOf(storageUri);

      const encodedKey = key
        .split('/')
        .map(encodeURIComponent)
        .join('/');

      return {
        url: `${baseUrl.replace(/\/$/, '')}/${encodedKey}`,
      };
    },

    // 파일 존재 여부
    async exists({storageUri}) {
      try {
        const info = await stat(fileOf(keyOf(storageUri)));
        return {exists: info.isFile()};
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          return {exists: false};
        }
        throw error;
      }
    },

    // 파일 삭제
    async delete({storageUri}) {
      await rm(fileOf(keyOf(storageUri)), {force: true});
      return {deleted: true as const};
    },
  });
}
