import { splashScreen } from "../windows/screens/splashScreen";
import { homeScreen } from "../windows/screens/homeScreen";
import { statusBar } from '../windows/component/statusBar';
import { modalComponent } from "../windows/component/modalComponent";
import StatusBarView  from './StatusBarView'
import DOMService from "./DOMService";
import SplashView from "./SplashView";
import Modal from "../windows/component/Modal";
import { feature } from "../windows/screens/feature";
import featureView from "./featureView";
import { modeSelection } from "../windows/screens/modeSelection";
import HomeView from "./homeView";
import WindowsController from "../controller/WindowsController";
import selectionView from "./selectionView";
import { cameraScreen } from "../windows/screens/cameraScreen";
import cameraView from "./cameraView";


export default class WindowService {
  private _domService: DOMService;

  constructor(domService: DOMService) {
    this._domService = domService;
  }

  public createAppElement(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.id= 'app';

    return wrapper
  }

  public createModal() {
    const modal: DocumentFragment = this._domService.createDocumentFragmentFromHTML(modalComponent);

    return modal;
  }

  public getSplashScreenHTML(): SplashView {
    const splash: DocumentFragment = this._domService.createDocumentFragmentFromHTML(splashScreen);
    
    return new SplashView(splash)
  }

  public getHomeScreen(controller: WindowsController): HomeView {
    const screen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(homeScreen);

    return new HomeView(screen,controller)
  }

  public getSelectScreen(controller: WindowsController): selectionView {
    const modeSelectionScreen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(modeSelection);

    return new selectionView(modeSelectionScreen,controller)
  }

  public getCameraScreen(): cameraView {
    const cameraScreenView : DocumentFragment = this._domService.createDocumentFragmentFromHTML(cameraScreen);

    return new cameraView(cameraScreenView)
  }

  public getFeatureScreen(): featureView  {
    const featureScreen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(feature);

    return new featureView(featureScreen)
  }
  public getmodeSelectionScreen()  {
    const modeSelectionScreen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(modeSelection);

    return modeSelectionScreen
  }

  public setStatusBar(): StatusBarView {
    const status: DocumentFragment = this._domService.createDocumentFragmentFromHTML(statusBar);

    return new StatusBarView(status, new Modal('modal-1'))
  }
}
