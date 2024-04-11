import WindowService from '../services/WindowService';
import WindowsControllerAbstract from './WindowsControllerAbstract';

export default class WindowsController extends WindowsControllerAbstract{
  private _windowService: WindowService;
  private _socket = new WebSocket('ws://localhost:3000');

  constructor(windowService: WindowService) {
    super();
    this._windowService = windowService;
    this._socket.addEventListener('open', function (_event) {
      console.log('Connexion WebSocket établie.');
    });
  }

  public override async setupEngine(): Promise<void> {
    try{
      const appElement: HTMLDivElement = this._windowService.createAppElement();
      const modal: DocumentFragment = this._windowService.createModal();
      const appToolsControl = [appElement,modal];
      
      appToolsControl.forEach((appTools)=> {
        console.log(appTools)
        this.injectElement(document.getElementById('root'), appTools);
      })
      const statusBarView = this._windowService.setStatusBar();
      this.injectElement(document.getElementById('root'), statusBarView.statusBar);
      postMessage({ progressUpdate: 0.5 }, '*')
      this.renderHomeScreen(appElement)
    }catch(error){
      this.handleError(error)
    }
  }

  public override renderCameraScreen(appElement: HTMLElement): void {
    const cameraScreen = this._windowService.getCameraScreen(this._socket)
    this.clearAppElement(appElement)
    this.injectElement(appElement, cameraScreen.cameraUi);
  }
  
  public override renderSelectionScreen(appElement: HTMLElement): void {
  try{
    const slectionScreen = this._windowService.getSelectScreen(this)
    this.clearAppElement(appElement)
    this.injectElement(appElement, slectionScreen.selectionUi);

  }catch(error){
    this.handleError(error)
  }
  }
  public renderformatSlectionScreen(appElement: HTMLElement): void {
  try{
    const formatSelectionScreen = this._windowService.getFormatSelectionScreen(this);
    this.clearAppElement(appElement)
    this.injectElement(appElement, formatSelectionScreen.formatSelectionUi);

  }catch(error){
    this.handleError(error)
  }
  }

  protected override renderHomeScreen (appElement: HTMLElement): void {
    const homeScreen = this._windowService.getHomeScreen(this)
    postMessage({ progressUpdate: 88 }, '*')
    this.injectElement(appElement, homeScreen.homeUi);

    postMessage({ progressUpdate: 100 }, '*')
    postMessage({ payload: 'removeLoading' }, '*')
    
  }

  protected override injectElement(parentElement: HTMLElement | null, childElement: DocumentFragment | HTMLElement): void {
    if (parentElement && childElement) {
      parentElement.appendChild(childElement);
    }
  }

  public clearAppElement(appElement: HTMLElement): void {
    while (appElement.firstChild) {
        appElement.removeChild(appElement.firstChild);
    }
}


  protected handleError(error: any): void {
    const errorStringify: string = String(error);
    const errTitleSplit = errorStringify.split('</>');
    let detailError: string[] = [];
    let TitleError: string[] = [];

    if (errTitleSplit.length >= 2) {
      TitleError = errTitleSplit[1].split('<->');
      detailError = errTitleSplit[1].split('<->');
    }

    document.body.style.backgroundColor = "#060606d0"
    document.getElementById('root')!.innerHTML = 
    `<div id="_err" class="err-container">
        <div class="indicator">
        <img id="_err_ico_loader" src=${'public/error-2.png'}>
        </div>
        <div id="_err_body" class="_err">
        ${`<h3> > ${TitleError[0] ?? errorStringify}</h3>
        <span>${detailError[0] ?? error.stack}</span>
        <span>${detailError[1] ?? ''}</span>`}
        </div>
    </div> ` 
  }
  
}



