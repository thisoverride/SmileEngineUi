import CameraScreenView from "./screenView/CameraScreenView"

export default class CameraView extends CameraScreenView{

  private _initView(element: HTMLElement): void {
    window.app.setFooter(element)
    window.app.clearTitle()
    window.app.hideHeader()
    const btnPhoto = document.querySelector('#btnPhoto')
    const btnReturn = document.querySelector('#btnReturn')
    if(btnPhoto && btnReturn) {
      btnPhoto.addEventListener('click',this._handleTakePhoto)
      btnReturn.addEventListener('click',this._handleReturn)
    }
  }

  public render() {
    const { body, footer } = this.renderTemplate();
    this._initView(footer);

    return body;
  }
  private _handleTakePhoto(_event: Event): void {
    const btnReturn = document.querySelector('#btnReturn') as HTMLElement
    btnReturn.style.transition = 'none';
    btnReturn.classList.add('disabled')
    
  }
  private _handleReturn(_event: Event): void {
    console.log('return ')
    window.navigation.changeView('PhotoOrientationViewScreen')
  }
  private _handleSetTimer(): void {}
}
