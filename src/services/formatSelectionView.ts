import WindowsController from "../controller/WindowsController";

export default class formatSelectionView {
  public formatSelectionUi: DocumentFragment;
  public windowsController: WindowsController;

  constructor(formatSelectionScreen: DocumentFragment,windowsController: WindowsController) {
    this.windowsController = windowsController;
    this.formatSelectionUi = formatSelectionScreen;
    this.setup()
  }


  public async setup() {
    const navigationButton = this.formatSelectionUi.querySelectorAll('button');
    const buttonPrevious = navigationButton[0];
    const buttonNext = navigationButton[1];
    const app = document.getElementById('app') as HTMLElement;

    buttonNext.addEventListener('click',() => this.windowsController.renderCameraScreen(app))
    buttonPrevious.addEventListener('click',() => this.windowsController.renderSelectionScreen(app))
  }
}
