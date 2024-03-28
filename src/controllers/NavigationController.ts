import WindowService from "../services/WindowService";
import { InjectEvent } from "../decorator/injector";

export default class NavigationController {
  private readonly windowsService: WindowService;

  constructor(windowsService: WindowService){
    document.addEventListener('changeScreen', this.navigationStack.bind(this));
    this.windowsService = windowsService;
  }

  private navigationStack(event: Event){
    const navigationEvent = event as CustomEvent;
    const targetScreen: string = navigationEvent.detail.set;

    switch (targetScreen) {
      case 'selectionView':
        this.renderModeSelectionView()
        break;
      case 'photoView':
        this.renderPhotoView()
        break;
      case 'optionPhotoView':
        this.renderOptionPhotoView()
        break;
      default:
        throw new Error(`Failed to access ${targetScreen} is not found`);
    }
  }


  private dispatchEvent(trigger: HTMLElement){
    console.log('trigger =>',trigger)
    const changeScreen = new CustomEvent('changeScreen',{
      detail: {
        set: trigger.dataset.screen
      },
      bubbles: true,
      cancelable: true
    });
    trigger.addEventListener('click', () => trigger.dispatchEvent(changeScreen));
  }

  @InjectEvent()
  public renderDefautlView(){
    this.windowsService.renderHomeScreen()
  }

  @InjectEvent()
  private renderModeSelectionView(){
    this.windowsService.renderModeSelectionView()
  }
  @InjectEvent()
  private renderPhotoView(){
    this.windowsService.renderPhotoView()
  }
  
  @InjectEvent()
  private renderOptionPhotoView(){
    this.windowsService.renderOptionPhotoView()
  }
  @InjectEvent()
  private renderBoomrangView(){
    throw new Error("Method not implemented.");
  }

}