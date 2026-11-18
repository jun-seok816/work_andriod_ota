
import 'dotenv/config';

import express from 'express';
import path from 'node:path';
import {toNodeHandler} from '@hot-updater/server';

import {hotUpdater} from './hotUpdater';

const app = express();

const PORT = Number(process.env.PORT ?? 3200);

const STORAGE_DIR = path.resolve(
    process.env.OTA_STORAGE_DIR ??
    '/home/joon/work/HelloOtaStorage/bundles',
);

const adminToken = process.env.HOT_UPDATER_ADMIN_TOKEN;

if (!adminToken) {
    throw new Error('HOT_UPDATER_ADMIN_TOKEN is required');
}


// OTA API 요청 및 응답 상태 확인
app.use('/hot-updater', (req, res, next) => {
  res.on('finish', () => {
    console.log(
      `[OTA HTTP] ${req.method} ${req.path} -> ${res.statusCode}`,
    );
  });

  next();
});

// 서버 상태 확인
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'HelloOtaUpdater',
    });
});

// OTA 업데이트 파일 다운로드
app.use(
    '/ota-files',
    express.static(STORAGE_DIR, {
        dotfiles: 'deny',
        index: false,
        fallthrough: false,
    }),
);

// OTA 관리자 API (인증 필요)
app.use(
    '/hot-updater/admin',
    (req, res, next) => {
        if (req.get('Authorization') !== `Bearer ${adminToken}`) {
            res.status(401).json({error: 'Unauthorized'});
            return;
        }
        next();
    },
    express.json({limit: '1mb'}),
    toNodeHandler(hotUpdater.handlers.admin),
);

// React Native 앱이 사용하는 OTA API
app.use(
    '/hot-updater',
    express.json({limit: '1mb'}),
    toNodeHandler(hotUpdater.handlers.client),
);

app.listen(PORT, '127.0.0.1', () => {
    console.log(`OTA Server: http://127.0.0.1:${PORT}`);
});
