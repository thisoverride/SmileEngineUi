import { homeScreen } from "../windows/screens/homeScreen";
import DOMService from "../utils/DOMService";
import { modeSelection } from "../windows/screens/modeSelectionScreen";
import { cameraScreen } from "../windows/screens/cameraScreen";
import { formatSelectionScreen } from "../windows/screens/formatSelectionScreen";
import { previewPhotoScreen } from "../windows/screens/previewPhotoScreen";
import { receptionStepsScreen } from "../windows/screens/receptionStepsScreen";
import FormatSelectionView from "../windows/views/FormatSelectionView";
import PhotoView from "../windows/views/PhotoView";
import ModeSelectionView from "../windows/views/ModeSelectionView";
import PreviewPhotoView from "../windows/views/PreviewPhotoView";
import type { Socket } from "socket.io-client";
import ReceptionSteps from "../windows/views/ReceptionSteps";
import HomeView from "../windows/views/HomeView";
import BoomerangView from "../windows/views/BoomerangView";


export default class UserService {
  private _domService: DOMService;
  private _photoView: PhotoView | null = null;
  private _boomrangView: BoomerangView | null = null;
  private _formatSelectionView: FormatSelectionView | null= null;
  private _modeSelectionView: ModeSelectionView | null = null;
  private _previewPhotoView: PreviewPhotoView | null = null;
  private socket: Socket;

  constructor(domService: DOMService, socket: Socket) {
    this._domService = domService;
    this.socket = socket;
  }

  public renderOptionPhotoView(): HTMLElement {
    if (!this._formatSelectionView) {
      const screen: HTMLElement = this._domService.stringToHTMLElement(formatSelectionScreen);
      this._formatSelectionView = new FormatSelectionView(screen,this.socket);
    }
    return this._formatSelectionView.getScreen();
  }

  public renderPhotoView(event: any): HTMLElement {
  if(event.detail.params === "retray") {
    this._photoView?.resetScreen();
  }
    if (this._photoView === null) {
      const screen: HTMLElement = this._domService.stringToHTMLElement(cameraScreen(true));
      this._photoView = new PhotoView(screen,this.socket, event);
    }
    return this._photoView.getScreen();
  }
  
  public renderBoomrangView(event: any): HTMLElement {
    if(event.detail.params === "retake") {
      this._boomrangView!.resetScreen();
    }

    if(this._boomrangView === null){
      const screen : HTMLElement = this._domService.stringToHTMLElement(cameraScreen(false));
      this._boomrangView = new BoomerangView(screen,this.socket);

    }
    return this._boomrangView.getScreen();
  } 


  public renderModeSelectionView(): HTMLElement {
    if(!this._modeSelectionView){
      this._modeSelectionView = null;
      const modeSelectionScreen : HTMLElement = this._domService.stringToHTMLElement(modeSelection);
      this._modeSelectionView = new ModeSelectionView(modeSelectionScreen,this.socket);
    }

    this._modeSelectionView = null;
    const modeSelectionScreen : HTMLElement = this._domService.stringToHTMLElement(modeSelection);
      this._modeSelectionView = new ModeSelectionView(modeSelectionScreen,this.socket);
    return this._modeSelectionView.getScreen();
  }

  public renderHomeView(): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(homeScreen); 
    const homeViewBuiness = new HomeView(screen,this.socket);

    if(this._photoView){
      this._photoView.destroy()
      this._photoView = null;
      this._previewPhotoView = null;
    }

    return homeViewBuiness.getScreen();
  }

  public previewPhotoView(event: any): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(previewPhotoScreen);
    this._previewPhotoView = new PreviewPhotoView(screen,this.socket,event)
    
    return this._previewPhotoView.getScreen();
  }

  public renderReceptionStepsScreen(event: any): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(receptionStepsScreen);
    const receptionStepsView = new ReceptionSteps(screen,event);
    return receptionStepsView.getScreen();
  }

  public destroyView(view :any): void {
    console.log('view  => ',view)
    view.detail.params.destroy();
    view.detail.params = null;
  }

}
