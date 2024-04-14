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


export default class UserService {
  private _domService: DOMService;
  private _photoView: PhotoView | null = null;
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
    this._photoView?.resetScreen()
  }
    if (!this._photoView) {
      const screen: HTMLElement = this._domService.stringToHTMLElement(cameraScreen);
      this._photoView = new PhotoView(screen,this.socket);
    }
    return this._photoView.getScreen();
  }


  public renderModeSelectionView(): HTMLElement {
    if(!this._modeSelectionView){
      this._modeSelectionView = null;
      const modeSelectionScreen : HTMLElement = this._domService.stringToHTMLElement(modeSelection);
      this._modeSelectionView = new ModeSelectionView(modeSelectionScreen);
    }

    this._modeSelectionView = null;
    const modeSelectionScreen : HTMLElement = this._domService.stringToHTMLElement(modeSelection);
      this._modeSelectionView = new ModeSelectionView(modeSelectionScreen);
    return this._modeSelectionView.getScreen();
  }

  public renderHomeView(): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(homeScreen);  
    return screen;
  }

  public renderBoomrangView(): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(cameraScreen);
    return screen;
  } 

  public previewPhotoView(event: any): HTMLElement {

    if(!this._previewPhotoView){
      const screen : HTMLElement = this._domService.stringToHTMLElement(previewPhotoScreen);
      this._previewPhotoView = new PreviewPhotoView(screen,this.socket,event)
    }
    return this._previewPhotoView.getScreen();

  }

  public renderReceptionStepsScreen(): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(receptionStepsScreen);
    return screen;
  }

}
