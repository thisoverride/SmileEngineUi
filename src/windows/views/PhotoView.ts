import type { Socket } from "socket.io-client";

export default class PhotoView {
  public cameraScreen: HTMLElement;
  private socket: Socket;
  private timerSelected: number = 3;
  private objectReady: boolean = true;
  private counterElement: HTMLElement;
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params:'', emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  
  constructor(cameraScreen: HTMLElement,socket: Socket) {
    this.cameraScreen = cameraScreen;
    this.socket = socket;
    this.counterElement = this.cameraScreen.querySelector('#counter') as HTMLElement;
    this.setup();
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

  private setupCameraTrigger() {
    const cameraTriggerBtn = this.cameraScreen.querySelector('#btn-camera');
    cameraTriggerBtn?.addEventListener('click', () => {
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
  
            this.socket.emit('shooting',{data: "shooting"});
           
            clearInterval(intervalId);
            this.counterElement.textContent = "";
            this.counterElement.style.opacity = '1';
            this.counterElement.style.background = "#ffff";
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
    });
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
    const canvas = this.cameraScreen.querySelector('canvas') as HTMLCanvasElement;

    canvas.addEventListener('click',(e) => {
      this.socket.emit('shooting',{data: "shooting"});
    })

    timer.addEventListener('click', () => {
      const timerList = this.cameraScreen.querySelector('.data-list') as HTMLElement;
      timerList.style.visibility = timerList.style.visibility === 'visible' ? 'hidden' : 'visible';
    });

    btnReturn.addEventListener('click',(_e) => this.socket.emit('close-stream',{ data: "close-stream" }))

    this.setupTimer();
    this.setupCameraTrigger();
    this.setupSocketListeners();
  }


  private setupSocketListeners(): void {
    this.socket.on('stream', this.handleStreamEvent);
    this.socket.on('shooting', this.handleShootingEvent.bind(this));
    this.socket.on('get-last-photo',this.handleGetLastPhotoEvent.bind(this))
  }


  private handleStreamEvent: (event: any) => void = (event) => {
    const canvas = this.cameraScreen.querySelector('canvas') as HTMLCanvasElement;
    const errorIndicator = document.querySelector('.camera-wrp') as HTMLElement;

    if(event.data === "OBJECT_NOTREADY" && this.objectReady) {
        errorIndicator.style.border = "5px solid #DF4138";
        this.objectReady = false; // Marque que l'objet n'est pas prêt
    } else if (event.data !== "OBJECT_NOTREADY" && !this.objectReady) {
        errorIndicator.style.border = "5px solid transparent";
        this.objectReady = true; // Marque que l'objet est prêt
    }

    if (event.data !== "OBJECT_NOTREADY") {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        let img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.captureStream();
        };
        img.src = event.data;
    }
};


  private handleShootingEvent(event: any): void {
    if(event.data === "OK"){
      this.socket.emit('get-last-photo',{ data: "get-last-photo" });
    }else {
      this.socket.emit('get-last-photo',{data: "get-last-photo"}); // delete this
    }
  }

  private handleGetLastPhotoEvent(event: any): void {
    PhotoView.CHANGE_SCREEN_EVENT.detail.set = 'previewPhoto';
    PhotoView.CHANGE_SCREEN_EVENT.detail.params = event;
    PhotoView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    PhotoView.CHANGE_SCREEN_EVENT.detail.emit = PhotoView.name;
    document.dispatchEvent(PhotoView.CHANGE_SCREEN_EVENT);
  }


  public getView(): this {
    return this
  }

  public getScreen(): HTMLElement {
    return this.cameraScreen;
  }
}
