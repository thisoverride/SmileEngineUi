export default class PhotoView {
  public cameraScreen: HTMLElement;
  private timerSelected: number = 3;
  private counterElement: HTMLElement;
  
  constructor(cameraScreen: HTMLElement) {
    this.cameraScreen = cameraScreen;
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
      let count = this.timerSelected;
      const updateCounter = () => {
        this.counterElement.style.opacity = '0';
        setTimeout(() => {
          if (count === 0) {
            // this._socket.send('shooting');
            clearInterval(intervalId);
            this.counterElement.textContent = "";
            this.counterElement.style.opacity = '1';
            this.counterElement.style.background = "#ffff";
            return;
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

  // private setupSocket() {
  //   const canvas = this.cameraScreen.querySelector('canvas') as HTMLCanvasElement;
  //   const ctx = canvas.getContext('2d');
  //   this._socket.send('Stream');

  //   this._socket.addEventListener('message', (event) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx?.drawImage(img, 0, 0);
  //     };
  //     img.src = event.data;
  //   });
  // }

  public setup() {
    const timer = this.cameraScreen.querySelector(".data-selected") as HTMLElement;
    this.counterElement = this.cameraScreen.querySelector('#counter') as HTMLElement;
    this.counterElement.textContent = this.timerSelected.toString();

    timer.addEventListener('click', () => {
      const timerList = this.cameraScreen.querySelector('.data-list') as HTMLElement;
      timerList.style.visibility = timerList.style.visibility === 'visible' ? 'hidden' : 'visible';
    });

    this.setupTimer();
    this.setupCameraTrigger();
    // this.setupSocket();
  }

  public getView() {
    return this
  }

  public getScreen() {
    return this.cameraScreen;
  }
}
