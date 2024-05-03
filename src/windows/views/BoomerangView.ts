import type { Socket } from "socket.io-client";

export default class BoomerangView {
  public cameraScreen: HTMLElement;
  private socket: Socket;
  private timerSelected: number = 3;
  private objectReady: boolean = true;
  private isClosed: boolean = false;
  private counterElement: HTMLElement;
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params:{}, emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  
  constructor(cameraScreen: HTMLElement,socket: Socket) {
    this.cameraScreen = cameraScreen;
    this.socket = socket;
    this.counterElement = this.cameraScreen.querySelector('#counter') as HTMLElement;
    this.socket.emit('stream', { data: 'photo-video' });
    this.setup();
  }

  private setupCameraTrigger() {
    const cameraTriggerBtn = this.cameraScreen.querySelector('#btn-camera');
    cameraTriggerBtn?.addEventListener('click', this.cameraTriggerClickHandler.bind(this));
  }

  public resetScreen(){
    const cameraTriggerBtn = this.cameraScreen.querySelector('#btn-camera');
    const btnTimerSelection = this.cameraScreen.querySelector('.data-selected') as HTMLElement;
    const btn = cameraTriggerBtn as HTMLButtonElement;
    const btnPrevious = this.cameraScreen.querySelector('.previous') as HTMLElement;
    btnPrevious.classList.remove('disabled');
    btn.classList.remove('disabled');
    btnTimerSelection.classList.remove('disabled');
    this.counterElement.style.background = "#ffffff79";
    this.counterElement.style.opacity = '0';
    this.socket.emit('stream',{ data: "stream"});
  }

  
  
  public setup() {
    const btnReturn =  this.cameraScreen.querySelector('#btn-return') as HTMLElement;
    const timer = this.cameraScreen.querySelector(".data-selected") as HTMLElement;
    this.counterElement = this.cameraScreen.querySelector('#counter') as HTMLElement;
    this.counterElement.textContent = this.timerSelected.toString();

    timer.addEventListener('click', this.timerClickHandler.bind(this));
    btnReturn.addEventListener('click', this.handleReturnButtonClick.bind(this));

    this.setupTimer();
    this.setupCameraTrigger();
    this.setupSocketListeners();
  }

  private setupTimer() {

    const timerList = this.cameraScreen.querySelector('.data-list') as HTMLElement;
    const selectedValue = this.cameraScreen.querySelector('#selected') as HTMLElement;
    
    selectedValue.textContent = `${this.timerSelected} s`;

    timerList.addEventListener('click', (e: Event) => {
      const timerValue = e.target as HTMLElement;
      const timerId = timerValue.id;
      if (['3', '5', '10'].includes(timerId)) {
        selectedValue.textContent = timerValue.textContent;
        this.timerSelected = parseInt(timerValue.textContent || '0');
        this.counterElement.textContent = this.timerSelected.toString();
        timerList.style.visibility = 'hidden';
      }
    });
  }

  private setupSocketListeners(): void {
    this.socket.on('stream', this.handleStreamEvent);
    this.socket.on('capture', this.handleCaptureEvent.bind(this));
    this.socket.on('get-boomerang-video',this.handleGetBoomerangVideoEvent.bind(this));
  }

  

  private cameraTriggerClickHandler = () => {
    const cameraTriggerBtn = this.cameraScreen.querySelector('#btn-camera');
    const btnTimerSelection = this.cameraScreen.querySelector('.data-selected') as HTMLElement;
    const btn = cameraTriggerBtn as HTMLButtonElement;
    const btnPrevious = this.cameraScreen.querySelector('.previous') as HTMLElement;
    
    btnPrevious.classList.add('disabled');
    btn.classList.add('disabled');
    btnTimerSelection.classList.add('disabled')
    this.counterElement.classList.add('v-visible');
    this.counterElement.style.background = "#ffffff79";
    let count: number = this.timerSelected;

    const updateCounter = () => {
      this.counterElement.style.opacity = '0';
      setTimeout(() => {
   
        if (count === 0) {
          clearInterval(intervalId);
          this.counterElement.textContent = "";
          this.counterElement.style.opacity = '0';
          this.socket.emit('capture');         
          // this.counterElement.style.background = "#ffff";
          return
        } else {
          this.counterElement.textContent = count.toString();
          this.counterElement.style.opacity = '1';
        }
      }, 500);
      count--;
    };
    updateCounter();
    const intervalId = setInterval(updateCounter, 1000);
  };


  private handleStreamEvent: (event: any) => void = (event) => {
    const canvas = this.cameraScreen.querySelector('canvas') as HTMLCanvasElement;
    const errorIndicator = document.querySelector('.camera-wrp') as HTMLElement;

    if (event.data === "OBJECT_NOTREADY" && this.objectReady && !this.isClosed) {
        errorIndicator.style.border = "5px solid #DF4138";
        this.objectReady = false; 
    } else if (event.data !== "OBJECT_NOTREADY" && !this.objectReady && !this.isClosed) {
        errorIndicator.style.border = "5px solid transparent";
        this.objectReady = true; 
    }

    if (event.data !== "OBJECT_NOTREADY") {
        let img = new Image();
        img.onload = () => {
            if (canvas.getAttribute('data-last-image') !== event.data) {
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                // const canvasWidth = canvas.width; // Largeur du canvas
                // const columnWidth = 550; // Largeur de chaque colonne
                // const dashLength = 10; // Longueur des tirets
                // const gapLength = 5; // Longueur des vides entre les tirets
            
                // const margin = (canvasWidth - columnWidth) / 2; // Marge de chaque côté
            
                // // Dessiner la première colonne en pointillés à gauche
                // ctx.setLineDash([dashLength, gapLength]); // Définir le motif de la ligne pointillée
                // ctx.lineWidth = 2; // Définir la largeur de la ligne
                // ctx.strokeStyle = 'red'; // Définir la couleur de la ligne
                // ctx.beginPath(); // Commencer le chemin
                // ctx.moveTo(margin, 0); // Déplacer le point de départ de la ligne
                // ctx.lineTo(margin, canvas.height); // Dessiner la ligne jusqu'au bas du canvas
                // ctx.stroke(); // Tracer la ligne
            
                // // Dessiner la deuxième colonne en pointillés à droite
                // ctx.setLineDash([dashLength, gapLength]); // Définir le motif de la ligne pointillée
                // ctx.lineWidth = 2; // Définir la largeur de la ligne
                // ctx.strokeStyle = 'red'; // Définir la couleur de la ligne
                // ctx.beginPath(); // Commencer le chemin
                // ctx.moveTo(canvasWidth - margin, 0); // Déplacer le point de départ de la ligne
                // ctx.lineTo(canvasWidth - margin, canvas.height); // Dessiner la ligne jusqu'au bas du canvas
                // ctx.stroke(); 

                const tempCanvas: HTMLCanvasElement = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const tempCtx = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
                tempCtx.drawImage(canvas, 0, 0);

                canvas.width = tempCanvas.width;
                canvas.height = tempCanvas.height;
                ctx.drawImage(tempCanvas, 0, 0);
                canvas.setAttribute('data-last-image', event.data);
            }
        };
        img.src = event.data;
    }
};


  private handleCaptureEvent(event: any): void {
    if(event.status === "OK"){
      console.log(event)
      this.socket.emit('get-boomerang-video',{ data: "get-boomerang-video" });
    }else {

    }
  }

  private handleReturnButtonClick = (_e: Event) => {
    this.isClosed = true;
    this.socket.emit('close-stream',{ data: "close-stream" });

    BoomerangView.CHANGE_SCREEN_EVENT.detail.set = 'selectionView';
    BoomerangView.CHANGE_SCREEN_EVENT.detail.params = "";
    BoomerangView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    BoomerangView.CHANGE_SCREEN_EVENT.detail.emit = BoomerangView.name;
    document.dispatchEvent(BoomerangView.CHANGE_SCREEN_EVENT);

    BoomerangView.CHANGE_SCREEN_EVENT.detail.set = '';
    BoomerangView.CHANGE_SCREEN_EVENT.detail.params = 'boomrangView';
    BoomerangView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL_DESTRY";
    BoomerangView.CHANGE_SCREEN_EVENT.detail.emit = BoomerangView.name;
    document.dispatchEvent(BoomerangView.CHANGE_SCREEN_EVENT);
  };

  private timerClickHandler = (_e: Event) => {
    const timerList = this.cameraScreen.querySelector('.data-list') as HTMLElement;
    timerList.style.visibility = timerList.style.visibility === 'visible' ? 'hidden' : 'visible';
};

  private handleGetBoomerangVideoEvent(event: any): void {
    BoomerangView.CHANGE_SCREEN_EVENT.detail.set = 'previewPhoto';
    BoomerangView.CHANGE_SCREEN_EVENT.detail.params = event;
    BoomerangView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    BoomerangView.CHANGE_SCREEN_EVENT.detail.emit = BoomerangView.name;
    document.dispatchEvent(BoomerangView.CHANGE_SCREEN_EVENT);
  }

  public destroy(): void {
    const timerList = this.cameraScreen.querySelector('.data-list') as HTMLElement;
    const cameraTriggerBtn = this.cameraScreen.querySelector('#btn-camera') as HTMLButtonElement;
    const btnReturn =  this.cameraScreen.querySelector('#btn-return') as HTMLElement;

 
    // const timer = this.cameraScreen.querySelector(".data-selected") as HTMLElement;

    timerList.removeEventListener('click', this.timerClickHandler);
    cameraTriggerBtn.removeEventListener('click', this.cameraTriggerClickHandler);
    btnReturn.removeEventListener('click', this.handleReturnButtonClick);

    this.socket.off('stream');
    this.socket.off('capture');
    this.socket.off('get-boomerang-video');

}

  public getView(): this {
    return this
  }

  public getScreen(): HTMLElement {
    return this.cameraScreen;
  }
}
