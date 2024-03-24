import WindowsController from "../controller/WindowsController";

export default class HomeView {
  public homeUi: DocumentFragment;
  private onAnimationEndHandler: () => void; 
  private windowsController: WindowsController

  constructor(splashScreen: DocumentFragment ,windowsController: WindowsController) {
    this.homeUi = splashScreen;
    this.windowsController = windowsController;
    // this.setup();
    this.setupScreen();
    this.onAnimationEndHandler = this._onAnimationEnd.bind(this); 
  }


  public setupScreen(){
    const containerScreen:HTMLElement | null = this.homeUi.getElementById('home-wrp');
    if(containerScreen){
      containerScreen.addEventListener('click',() => {
        const app = document.getElementById('app')
        if(app){
          this.windowsController.renderSelectionScreen(app)
        }
      })
    }

  }
  public setup() {
    const test = this.homeUi.querySelector('#aled')
    // const test2 = this.homeUi.querySelector('#waled')

    // test!.addEventListener(('click'), () => {
    //   window.ipcRenderer.send('triggerCamera')
    // })
    // test2!.addEventListener(('click'), () => {
    //   window.ipcRenderer.send('liveView', { active: true})
    // })
    

    // window.ipcRenderer.send('liveView', { active: false})

  
    
  //   const canvas = this.homeUi.querySelector('canvas') as HTMLCanvasElement;
  //   const ctx = canvas.getContext('2d');
  //   window.ipcRenderer.on('liveViewImage', (_event, param) => {
  //     const img = new Image();
  //     img.onload = () => {
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         ctx?.drawImage(img, 0, 0);
  //     };
  //     img.src = param;
  // });


    // window.ipcRenderer.on('liveViewImage',(_event,param) => {
    //  liveImg!.src = param
    //  console.log('blob =>',param)
    // })
 
    // this.homeUi.querySelector('.indicator')!.addEventListener('click',()=> {

    // })
  }

  public remove() {
    const splashScreen = document.getElementById('splash');

    if (splashScreen) {
      splashScreen.classList.add('fadeOut');
      splashScreen.addEventListener('animationend', this.onAnimationEndHandler);
    }
  }

  private _onAnimationEnd() {
    const splashScreen = document.getElementById('splash');
    if (splashScreen && splashScreen.parentNode) {
      splashScreen.parentNode.removeChild(splashScreen);
      splashScreen.removeEventListener('animationend', this.onAnimationEndHandler); 
    }
  }
}
