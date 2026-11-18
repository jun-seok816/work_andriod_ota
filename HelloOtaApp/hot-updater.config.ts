
import {existsSync} from 'node:fs';
import {bare} from '@hot-updater/bare';
import {standaloneRepository} from '@hot-updater/standalone';
import {defineConfig} from 'hot-updater';
import {apiKeys, insights} from 'hot-updater/plugins';

import {localStorage} from '../HelloOtaUpdater/src/localStorage';

// OTA 서버의 기존 환경변수 사용
const envPath = '../HelloOtaUpdater/.env';

if (existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const adminToken = process.env.HOT_UPDATER_ADMIN_TOKEN;

if (!adminToken) {
  throw new Error('HOT_UPDATER_ADMIN_TOKEN이 없습니다.');
}
//CLI가 hot-updater.config.ts 로드
export default defineConfig({
  //JS/TS → Metro 번들 → Hermes
  build: bare({
    enableHermes: true,
  }),

  //HelloOtaStorage에 번들 파일 저장
  storage: localStorage(),

  //OTA 서버 관리자 API 호출
  database: standaloneRepository({
    baseUrl: 'http://127.0.0.1:3200/hot-updater/admin',
    commonHeaders: {
      Authorization: `Bearer ${adminToken}`,
    },
  }),

  plugins: [insights(), apiKeys()],
  updateStrategy: 'appVersion',
});

// cd ~/work/HelloOtaApp
//
// npx hot-updater deploy \
//   -p android \
//   -c ota-test \
//   -t "1.0.0" \
//   -m "세 번째 OTA 실제 적용 테스트"
