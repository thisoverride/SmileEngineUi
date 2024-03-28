import { homeScreen } from "../views/homeScreen";
import { statusBar } from '../windows/component/statusBar';
import { modalComponent } from "../windows/component/modalComponent";
import StatusBarView  from './StatusBarView'
import DOMService from "./DOMService";
import Modal from "../windows/component/Modal";
import { feature } from "../windows/screens/feature";
import featureView from "./featureView";
import { modeSelection } from "../views/modeSelection";
import { cameraScreen } from "../views/cameraScreen";
import { formatSelectionScreen } from "../views/formatSelectionScreen";



export default class WindowService {
  

  public renderOptionPhotoView () {
    const screen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(formatSelectionScreen);
    this._domService.render(screen,true);
  }
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

  public renderHomeScreen(): void {
    const screen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(homeScreen);
    this._domService.render(screen)
  }

  public renderModeSelectionView() {
    const modeSelectionScreen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(modeSelection);
    const app: NodeListOf<Element> = modeSelectionScreen.querySelectorAll('.tile');

    if(app.length > 0){
      modeSelectionScreen.querySelectorAll('.tile').forEach(application => {
        application.addEventListener('click', (event) => {
          const element = event.currentTarget as HTMLElement;
          if(element && !element.classList.contains('tile--expanded')){
            element.style.pointerEvents = 'none';
            const parentElement = element.parentNode as HTMLElement;
            parentElement.classList.remove(parentElement.classList[0]);
            const icon = parentElement.querySelector('#icon-app') as HTMLElement;
            icon.style.zIndex = "1500";
            icon.style.width = "30%";
            icon.style.height = "30%";
            
            const tileRect = element.getBoundingClientRect();
            const width = tileRect.right - tileRect.left;
            const height = tileRect.bottom - tileRect.top;
            const iWidth = window.innerWidth;
            const iHeight = window.innerHeight;
        
          element.style.backgroundColor = "#050f1c"
          element.classList.add('tile--expanded');
          element.style.transform = `
            translateX(${(iWidth - width) / 2 - tileRect.left}px)
            translateY(${(iHeight - height) / 2 - tileRect.top}px)
            scaleX(${iWidth / width})
            scaleY(${iHeight / height})`;      
          }
        })
        application.addEventListener('transitionend', (event: Event)=> {
          const transitionEvent = event as TransitionEvent;
          if(transitionEvent.propertyName === "transform"){
            const element = event.currentTarget as HTMLElement;
            setTimeout(() => {
              const changeScreen = new CustomEvent('changeScreen',{
                detail: {
                  set: 'optionPhotoView'
                },
                bubbles: true,
                cancelable: true
              });
   
              element.classList.add('fadeOut');
              const app = document.getElementById('app');
              if(app){
                if(element.id === "app-02"){
                  alert('Not root implemented')
                }
                if(element.id === "app-01"){
                  document.dispatchEvent(changeScreen)
                }
        }
      }, 800);
    }
        });
      });
    }
    this._domService.render(modeSelectionScreen,true)
  }

  public renderPhotoView() {
    const screen : DocumentFragment = this._domService.createDocumentFragmentFromHTML(cameraScreen);
    const cameraTriggerBtn = screen.querySelector('#btn-camera');
    const timer = screen.querySelector(".data-selected") as HTMLElement;
    const timerList = screen.querySelector('.data-list') as HTMLElement;
    const selectedValue = timer.querySelector('#selected') as HTMLElement;
    const counterElement = screen.querySelector('#counter') as HTMLElement;
    let defaultCounterValue = 3;
    counterElement.textContent = defaultCounterValue.toString()

    selectedValue.textContent = `${defaultCounterValue} s`;
    
    timer.addEventListener('click', () => {
      timerList.style.visibility = timerList.style.visibility === 'visible' ? 'hidden' : 'visible';
    });
    
    timerList.addEventListener('click', (e: Event) => {
      const timerValue = e.target as HTMLElement;
      const timerId = timerValue.id;
    
      if (['3', '5', '10'].includes(timerId)) {
        selectedValue.textContent = parseInt(timerValue.textContent ?? '');
        defaultCounterValue = timerValue.textContent ?? ''
        const counterElement = document.getElementById('counter') as HTMLElement;
        counterElement.textContent = defaultCounterValue
        timerList.style.visibility = 'hidden';
      }
    });
    
    
   cameraTriggerBtn!.addEventListener('click', () => {
      const counterElement = document.getElementById('counter') as HTMLElement;
      const timer = document.querySelector(".data-selected") as HTMLElement;
      counterElement.style.visibility = "visible";
      const btn = cameraTriggerBtn as HTMLButtonElement;
      btn.classList.add('disabled');
      timer.classList.add('disabled');
      let count = defaultCounterValue
      counterElement.style.background ="#ffffff79"
      counterElement.textContent = count.toString();


  const updateCounter = () => {
 
    counterElement.style.opacity = '0';

    setTimeout(() => {
    
      
      if (count === 0) {
        // this._socket.send('shooting')
        counterElement.style.opacity = '1';
        clearInterval(intervalId);
        counterElement.textContent = ""
        counterElement.style.background ="#fff"
        
        return;
      }else{
        counterElement.textContent = count.toString();
        counterElement.style.opacity = '1';

      }
  
    }, 500);

    count--;
  };

  updateCounter();

  const intervalId = setInterval(updateCounter, 1000);

 
});

    
    
    
    const canvas = screen.querySelector('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  //   this._socket.send('Stream')

  //   this._socket.addEventListener('message', function (event) {
  //     const img = new Image();
  //     img.onload = () => {
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         ctx?.drawImage(img, 0, 0);
  //     };
  //     img.src = event.data;
  // });
  this._domService.render(screen,true)
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
