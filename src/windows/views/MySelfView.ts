import type { Socket } from "socket.io-client";

export default class MySelfView {
  public mySelfScreen: HTMLElement;
  private socket: Socket;

  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params: {}, emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  
  constructor(mySelfScreen: HTMLElement,socket: Socket) {
    this.mySelfScreen = mySelfScreen;
    this.socket = socket;
    this.setup()
  }



  public setup() {
    const titleScreen = this.mySelfScreen.querySelector('.text-indicator-selection') as HTMLElement;
    titleScreen.innerHTML= "Récupérez toutes vos photos prises par le photographe au cours de l'événements"
    const btnReturn =  this.mySelfScreen.querySelector('#btn-action-return') as HTMLElement;
    const btnNext =  this.mySelfScreen.querySelector('#btn-action-next') as HTMLElement;
    btnNext.addEventListener('click', this.handleNextButtonClick.bind(this));
    btnReturn.addEventListener('click', this.handleReturnButtonClick.bind(this));
    this.setupSocketListeners();
  }


  private setupSocketListeners(): void {
    this.socket.on('myself-stream', this.handleStreamEvent);
  }


  private handleStreamEvent: (event: any) => void = async (event) => {
    console.log(event)
    const canvas = this.mySelfScreen.querySelector('canvas') as HTMLCanvasElement;
    const titleScreen = this.mySelfScreen.querySelector('.text-indicator-selection') as HTMLElement;

    let currentAngle = '';
    if(currentAngle === ''){
      currentAngle = event.currentAngle
      titleScreen.innerHTML= "Capture de " + currentAngle
    }

    if(event.currentAngle === "completed"){
      canvas.style.display = 'none'
    }

    if(event.isFinish){
      currentAngle = event.currentAngle
      titleScreen.innerHTML= "Capture de " + currentAngle
    }

        let img = new Image();
        img.onload = async () => {
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            if(event.box){
              const box = event.box._box;
              const x = box._x;
              const y = box._y;
              const width = box._width;
              const height = box._height;
              
              ctx.beginPath();
              ctx.strokeStyle = '#fff'; 
              ctx.lineWidth = 4; 
              // Dessiner le coin supérieur gauche
              ctx.moveTo(x, y);
              ctx.lineTo(x + 10, y);
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + 10);
              // Dessiner le coin supérieur droit
              ctx.moveTo(x + width, y);
              ctx.lineTo(x + width - 10, y);
              ctx.moveTo(x + width, y);
              ctx.lineTo(x + width, y + 10);
              // Dessiner le coin inférieur gauche
              ctx.moveTo(x, y + height);
              ctx.lineTo(x + 10, y + height);
              ctx.moveTo(x, y + height);
              ctx.lineTo(x, y + height - 10);
              // Dessiner le coin inférieur droit
              ctx.moveTo(x + width, y + height);
              ctx.lineTo(x + width - 10, y + height);
              ctx.moveTo(x + width, y + height);
              ctx.lineTo(x + width, y + height - 10);
              ctx.stroke();
          }
          
        };
        
        img.src = event.data;
        
};





  private handleNextButtonClick = (_e: Event) => {
    this.socket.emit('myself-stream',{ data: 'myself-stream' });
    const slideContent: NodeListOf<HTMLElement> = this.mySelfScreen.querySelectorAll('.slide-content');
    slideContent.forEach(item => item.classList.add('hidden'));
    const canvas = this.mySelfScreen.querySelector('canvas') as HTMLCanvasElement;
    canvas.classList.remove('hidden');
  };

  private handleReturnButtonClick = (_e: Event) => {

    this.socket.emit('close-myself-stream',{ data: "close-myself-stream" });

    MySelfView.CHANGE_SCREEN_EVENT.detail.set = 'selectionView';
    MySelfView.CHANGE_SCREEN_EVENT.detail.params = "";
    MySelfView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    MySelfView.CHANGE_SCREEN_EVENT.detail.emit = MySelfView.name;
    document.dispatchEvent(MySelfView.CHANGE_SCREEN_EVENT);

    MySelfView.CHANGE_SCREEN_EVENT.detail.set = '';
    MySelfView.CHANGE_SCREEN_EVENT.detail.params = this.getView();
    MySelfView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL_DESTRY";
    MySelfView.CHANGE_SCREEN_EVENT.detail.emit = MySelfView.name;
    document.dispatchEvent(MySelfView.CHANGE_SCREEN_EVENT);
  };


  public getView(): this {
    return this
  }

  public getScreen(): HTMLElement {
    return this.mySelfScreen;
  }
}
