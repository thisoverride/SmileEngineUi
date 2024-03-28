

export default class formatSelectionView {
  public formatSelectionUi: DocumentFragment;

  constructor(formatSelectionScreen: DocumentFragment) {
    this.formatSelectionUi = formatSelectionScreen;
    this.setup()
  }


  public async setup() {
    const navigationButton = this.formatSelectionUi.querySelectorAll('button');
    const buttonPrevious = navigationButton[0];
    const buttonNext = navigationButton[1];
    const app = document.getElementById('app') as HTMLElement;
  }
}
