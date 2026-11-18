import { HotUpdater, insights } from '@hot-updater/react-native';
import { OTA_BASE_URL, HOT_UPDATER_API_KEY } from '@env';

export const hotUpdater = HotUpdater.init({
  baseURL: OTA_BASE_URL,

  requestHeaders: {
    'x-api-key': HOT_UPDATER_API_KEY,
  },

  plugins: [insights()],

  onError: error => {
    console.error('[OTA] 오류:', error);
  },
});
