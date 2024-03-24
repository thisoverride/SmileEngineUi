import SplashView from "../services/SplashView";

export default abstract class WindowsControllerAbstract {

  protected abstract setupEngine(): Promise<void> 

  protected abstract renderSplashScreen(appElement: HTMLElement): void;
  
  protected abstract renderCameraScreen(appElement: HTMLElement): void;

  protected abstract renderSelectionScreen(appElement: HTMLElement): void;

  protected abstract renderHomeScreen(appElement: HTMLElement, splash : SplashView): void 

  protected abstract injectElement(parentElement: HTMLElement | null, childElement: DocumentFragment | HTMLElement): void

  protected abstract waitForDOMReady(condition: DocumentReadyState[]): Promise<boolean> 
}
