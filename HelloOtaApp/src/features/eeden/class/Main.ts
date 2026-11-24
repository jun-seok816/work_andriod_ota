export class Main {
  private iv_ForceRender: () => void = () => {};

  public im_SetForceRender(p_ForceRender: () => void) {
    this.iv_ForceRender = p_ForceRender;
  }

  public im_forceRender() {
    this.iv_ForceRender();
  }

  public im_Mounted() {
    // 이벤트 연결, 초기화 등
  }

  public im_UnMounted() {
    // cleanup
  }
}