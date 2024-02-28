import { splashScreen } from "../windows/screens/splashScreen";
import { homeScreen } from "../windows/screens/homeScreen";
import { statusBar } from '../windows/component/statusBar';
import { modalComponent } from "../windows/component/modalComponent";
import StatusBarView  from './StatusBarView'
import DOMService from "./DOMService";
import SplashView from "./SplashView";
import Modal from "../windows/component/Modal";


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

  public getHomeScreen(): DocumentFragment {
    const screen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(homeScreen);

    return screen
  }

  public setStatusBar(): StatusBarView {
    const status: DocumentFragment = this._domService.createDocumentFragmentFromHTML(statusBar);

    return new StatusBarView(status, new Modal('modal-1'))
  }
}
