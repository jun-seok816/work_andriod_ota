# Hello OTA

React Native 앱의 OTA 업데이트를 시험하는 프로젝트입니다. 앱은 Hot Updater로 JS 번들을 확인하고, 별도 API에서 화면 데이터를 가져옵니다.

## 구성

- `HelloOtaApp`: React Native 앱 및 OTA 배포 CLI 설정
- `HelloOtaUpdater`: OTA 조회·관리 API와 릴리스 정보 관리
- `HelloOtaStorage`: 배포된 번들 파일 저장소
- `HelloOtaApi`: 앱 화면 데이터 API

## OTA 시퀀스

```mermaid
sequenceDiagram
    autonumber
    actor Dev as 개발자
    participant CLI as Hot Updater CLI
    participant Server as HelloOtaUpdater
    participant DB as OTA DB
    participant Storage as HelloOtaStorage
    participant App as HelloOtaApp

    Dev->>CLI: Android OTA 배포 실행
    CLI->>CLI: JS 번들 빌드
    CLI->>Storage: 번들 파일 저장
    CLI->>Server: 릴리스 등록
    Server->>DB: 채널·앱 버전별 릴리스 기록

    App->>Server: 실행 시 업데이트 확인
    Server->>DB: 릴리스 목록 조회
    Server-->>App: 업데이트 후보 정보
    alt 적용할 업데이트가 있음
        App->>Server: 번들 파일 요청
        Server->>Storage: 저장된 파일 조회
        Storage-->>Server: 번들 파일
        Server-->>App: 번들 다운로드
        App->>App: 번들 저장 및 적용
    else 적용할 업데이트가 없음
        App->>App: 기존 번들 사용
    end
```

앱은 `appVersion` 전략을 사용하며, Android 기본 채널은 `ota-test`입니다. 일반 화면 데이터 요청은 `HelloOtaApi`가 별도로 처리합니다.

자세한 구조와 API 흐름은 [OTA_SEQUENCE.md](OTA_SEQUENCE.md)를 참고하세요.
