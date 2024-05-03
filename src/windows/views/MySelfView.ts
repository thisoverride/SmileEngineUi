import type { Socket } from "socket.io-client";

export default class PhotoView {
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
    this.socket.emit('myself-stream', { data: 'photo-video' });
  }


  private setupSocketListeners(): void {
    this.socket.on('myself-stream', this.handleStreamEvent);
  }



  private handleStreamEvent: (event: any) => void = async (event) => {
    const canvas = this.mySelfScreen.querySelector('canvas') as HTMLCanvasElement;

        let img = new Image();
        img.onload = async () => {
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            if(event.box){
              const box = event.box._box;
              ctx.beginPath();
              ctx.strokeStyle = 'green'; // Couleur du carré
              ctx.lineWidth = 2; // Largeur de la ligne du carré
              ctx.rect(box._x, box._y, box._width, box._height);
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

    this.socket.emit('close-stream',{ data: "close-stream" });

    PhotoView.CHANGE_SCREEN_EVENT.detail.set = 'selectionView';
    PhotoView.CHANGE_SCREEN_EVENT.detail.params = "";
    PhotoView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    PhotoView.CHANGE_SCREEN_EVENT.detail.emit = PhotoView.name;
    document.dispatchEvent(PhotoView.CHANGE_SCREEN_EVENT);

    PhotoView.CHANGE_SCREEN_EVENT.detail.set = '';
    PhotoView.CHANGE_SCREEN_EVENT.detail.params = this.getView();
    PhotoView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL_DESTRY";
    PhotoView.CHANGE_SCREEN_EVENT.detail.emit = PhotoView.name;
    document.dispatchEvent(PhotoView.CHANGE_SCREEN_EVENT);
  };


  public getView(): this {
    return this
  }

  public getScreen(): HTMLElement {
    return this.mySelfScreen;
  }
}
