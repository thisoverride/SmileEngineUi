
export default class cameraView {
  public cameraUi: DocumentFragment;
  private timerSelected: number = 3;
  private _socket: WebSocket;
  
  constructor(feature: DocumentFragment,socket: WebSocket) {
    this.cameraUi = feature;
    this._socket = socket;
    this.setup()
  }


  public async setup() {
    const cameraTriggerBtn = this.cameraUi.querySelector('#btn-camera');
    const timer = this.cameraUi.querySelector(".data-selected") as HTMLElement;
    const timerList = this.cameraUi.querySelector('.data-list') as HTMLElement;
    const selectedValue = timer.querySelector('#selected') as HTMLElement;
    const counterElement = this.cameraUi.querySelector('#counter') as HTMLElement;
    counterElement.textContent = this.timerSelected.toString();

    selectedValue.textContent = `${this.timerSelected.toString()} s`;
    
    timer.addEventListener('click', () => {
      timerList.style.visibility = timerList.style.visibility === 'visible' ? 'hidden' : 'visible';
    });
    
    timerList.addEventListener('click', (e: Event) => {
      const timerValue = e.target as HTMLElement;
      const timerId = timerValue.id;
    
      if (['3', '5', '10'].includes(timerId)) {
        selectedValue.textContent = timerValue.textContent;
        this.timerSelected = parseInt(timerValue.textContent ?? '')
        const counterElement = document.getElementById('counter') as HTMLElement;
        counterElement.textContent = this.timerSelected.toString()
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
      let count = this.timerSelected;
      counterElement.style.background ="#ffffff79"
      counterElement.textContent = count.toString();


  const updateCounter = () => {
 
    counterElement.style.opacity = '0';

    setTimeout(() => {
    
      
      if (count === 0) {
        this._socket.send('shooting')
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

    
    
    
    const canvas = this.cameraUi.querySelector('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    this._socket.send('Stream')

    this._socket.addEventListener('message', function (event) {
      const img = new Image();
      img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
      };
      img.src = event.data;
  });
   
    

  }

}
