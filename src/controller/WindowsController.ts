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
    await this.waitForDOMReady(['complete', 'interactive']);
    const splash: SplashView = this._windowService.getSplashScreenHTML();

    this.injectElement(document.getElementById('root'), splash.splashUi);
    splash.updateProgressBar(0.5);

    const appElement: HTMLDivElement = this._windowService.createAppElement();
    const modal = this._windowService.createModal();

    this.injectElement(document.getElementById('root'), modal);
    this.injectElement(document.getElementById('root'), appElement);
    splash.updateProgressBar(50);

    this.renderHomeScreen(appElement,splash)
   
  }

  protected override renderHomeScreen (appElement: HTMLElement,splash : SplashView): void {
    const statusBarView = this._windowService.setStatusBar();
    const homeScren = this._windowService.getHomeScreen()
    splash.updateProgressBar(88);

    this.injectElement(appElement, homeScren);
    this.injectElement(document.getElementById('root'), statusBarView.statusBar);
    splash.updateProgressBar(100);
    
    setTimeout(() => {
      splash.updateProgressBar(100);
      splash.remove();
    }, 2500);
    
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
  
}



