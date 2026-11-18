
import {localStorage} from './localStorage';

async function main() {
  const storage = localStorage();

  const {storageUri} = await storage.put({
    key: 'test/hello.txt',
    body: new Blob(['Hello OTA Storage']).stream(),
    contentType: 'text/plain',
  });

  console.log('저장:', storageUri);

  const {exists} = await storage.exists({storageUri});
  console.log('존재:', exists);

  const {response} = await storage.get({storageUri});
  console.log('내용:', await response?.text());

  const {url} = await storage.getDownloadUrl({storageUri});
  console.log('URL:', url);

  await storage.delete({storageUri});
  console.log('삭제 완료');
}

main().catch(console.error);
