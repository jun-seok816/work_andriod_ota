import { hotUpdater } from './src/hotUpdater';
import { CalendarScreen } from './src/features/calendar/CalendarScreen';

export default hotUpdater.wrap({
  updateStrategy: 'appVersion',
  onProgress: progress => {
    console.log('[OTA] 다운로드:', Math.round(progress * 100) + '%');
  },
  onUpdateProcessCompleted: result => {
    console.log('[OTA] 업데이트 확인:', result.status);
  },
})(CalendarScreen);
