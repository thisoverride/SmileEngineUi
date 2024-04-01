export default class FormatSelectionView {
  private formatSelectionScreen: HTMLElement;

  constructor(formatSelectionScreen: HTMLElement) {
    this.formatSelectionScreen = formatSelectionScreen;
    this.init()
  }


  private async init() {

  }

  public renderView() {
    return this
  }

  public getScreen() {
    return this.formatSelectionScreen;
  }
}
