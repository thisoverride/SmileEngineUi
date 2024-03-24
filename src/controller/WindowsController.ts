import SplashView from '../services/SplashView';
import WindowService from '../services/WindowService';
import WindowsControllerAbstract from './WindowsControllerAbstract';

export default class WindowsController extends WindowsControllerAbstract{
  private _windowService: WindowService;

  constructor(windowService: WindowService) {
    super();
    this._windowService = windowService;
  }

  public override async setupEngine(): Promise<void> {
    await this.renderSplashScreen();
  }

  protected async renderSplashScreen(): Promise<void> {
    try {
      await this.waitForDOMReady(['complete', 'interactive']);
      const splash: SplashView = this._windowService.getSplashScreenHTML();
      this.injectElement(document.getElementById('root'), splash.splashUi);
      splash.updateProgressBar(0.5);
      // window.ipcRenderer.send('camera-mode-live')
      const appElement: HTMLDivElement = this._windowService.createAppElement();
      const modal = this._windowService.createModal();
  
      this.injectElement(document.getElementById('root'), modal);
      this.injectElement(document.getElementById('root'), appElement);
      splash.updateProgressBar(50);
  
      this.renderHomeScreen(appElement,splash)


    } catch (error) {
      this.handleError(error)
    }
   
  }

  private async renderFeatureScreen() {
    const featureScreen = this._windowService.getFeatureScreen()

    const r = featureScreen.ob()

    r.handeGesture()

    this.injectElement(document.getElementById('root'),featureScreen.feature)
  }
  private async renderModeSelectionScreen() {
    const modeSelectionScreen = this._windowService.getmodeSelectionScreen()


    this.injectElement(document.getElementById('root'),modeSelectionScreen)
  }

  public override renderCameraScreen(appElement: HTMLElement): void {
    const cameraScreen = this._windowService.getCameraScreen()
    appElement.innerHTML = ""
    this.injectElement(appElement, cameraScreen.cameraUi);
  }
  
  public override renderSelectionScreen(appElement: HTMLElement): void {
    const slectionScreen = this._windowService.getSelectScreen(this)
    appElement.innerHTML = ""
    this.injectElement(appElement, slectionScreen.selectionUi);

  }

  protected override renderHomeScreen (appElement: HTMLElement,splash : SplashView): void {
    const statusBarView = this._windowService.setStatusBar();
    const homeScreen = this._windowService.getHomeScreen(this)
    splash.updateProgressBar(88);

    this.injectElement(appElement, homeScreen.homeUi);
    this.injectElement(document.getElementById('root'), statusBarView.statusBar);
    splash.updateProgressBar(100);
     
    setTimeout(() => {
      splash.updateProgressBar(100);
      splash.remove();
    }, 2500); // 2500
    
  }



  protected override injectElement(parentElement: HTMLElement | null, childElement: DocumentFragment | HTMLElement): void {
    if (parentElement && childElement) {
      parentElement.appendChild(childElement);
    }
  }

  protected override async waitForDOMReady(condition: DocumentReadyState[]): Promise<boolean> {
    return new Promise(resolve => {
      const handleReadyStateChange = () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
          document.removeEventListener('readystatechange', handleReadyStateChange);
        }
      };
  
      if (condition.includes(document.readyState)) {
        resolve(true);
      } else {
        document.addEventListener('readystatechange', handleReadyStateChange);
      }
    });
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
    </div> 
` 
  }
  
}



