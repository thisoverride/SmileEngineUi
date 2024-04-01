import { homeScreen } from "../windows/screens/homeScreen";
import DOMService from "../utils/DOMService";
import { modeSelection } from "../windows/screens/modeSelectionScreen";
import { cameraScreen } from "../windows/screens/cameraScreen";
import { formatSelectionScreen } from "../windows/screens/formatSelectionScreen";
import { confirmPhoto } from "../windows/screens/confirmPhotoScreen";
import { receptionStepsScreen } from "../windows/screens/receptionStepsScreen";
import FormatSelectionView from "../windows/views/FormatSelectionView";
import PhotoView from "../windows/views/PhotoView";
import ModeSelectionView from "../windows/views/ModeSelectionView";


export default class UserService {
  private _domService: DOMService;
  private _formatSelectionView: FormatSelectionView | null= null;
  private _photoView: PhotoView | null = null;
  private _modeSelectionScreen: ModeSelectionView | null = null;

  constructor(domService: DOMService) {
    this._domService = domService;
  }

  public renderOptionPhotoView(): HTMLElement {
    if (!this._formatSelectionView) {
      const screen: HTMLElement = this._domService.stringToHTMLElement(formatSelectionScreen);
      this._formatSelectionView = new FormatSelectionView(screen);
    }
    return this._formatSelectionView.getScreen();
  }

  public renderPhotoView(): HTMLElement {
    if (!this._photoView) {
      const screen: HTMLElement = this._domService.stringToHTMLElement(cameraScreen);
      this._photoView = new PhotoView(screen);
    }
    return this._photoView.getScreen();
  }


  public renderModeSelectionView(): HTMLElement {
    if(!this._modeSelectionScreen){
      const modeSelectionScreen : HTMLElement = this._domService.stringToHTMLElement(modeSelection);
      this._modeSelectionScreen = new ModeSelectionView(modeSelectionScreen);
    }
    this._modeSelectionScreen = null;
    const modeSelectionScreen : HTMLElement = this._domService.stringToHTMLElement(modeSelection);
      this._modeSelectionScreen = new ModeSelectionView(modeSelectionScreen);
    return this._modeSelectionScreen.getScreen();
  }

  public renderHomeView(): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(homeScreen);  
    return screen;
  }

  public renderBoomrangView(): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(cameraScreen);
    return screen;
  }

  public renderConfirmPhotoView(): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(confirmPhoto);
    return screen;
  }

  public renderReceptionStepsScreen(): HTMLElement {
    const screen : HTMLElement = this._domService.stringToHTMLElement(receptionStepsScreen);
    return screen;
  }

}
