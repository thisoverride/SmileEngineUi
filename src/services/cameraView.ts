
export default class cameraView {
  public cameraUi: DocumentFragment;
  private timerSelected: number = 3;
  
  constructor(feature: DocumentFragment) {
    this.cameraUi = feature;
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
      counterElement.style.visibility = "visible"
    
      let count = this.timerSelected;
    
      const updateCounter = () => {
        if (count === 0) {
          console.log('photo');
          counterElement.style.visibility = "hidden";
          clearInterval(intervalId);
          return;
        }
    
        counterElement.style.opacity = '0';
    
        setTimeout(() => {
          if (count === 1) {
            counterElement.innerHTML = '<img class="ico-camera-picture" src="/icon/camera.png">'; 
          } else {
            counterElement.textContent = count.toString();
          }
          counterElement.style.opacity = '1';
        }, 500);
    
        count--;
      };
    
      updateCounter();
    
      const intervalId = setInterval(updateCounter, 1000);
    });
    
    
    
    // window.ipcRenderer.send('triggerCamera')
    // test2!.addEventListener(('click'), () => {
    //   window.ipcRenderer.send('liveView', { active: true})
    // })
    

    // window.ipcRenderer.send('liveView', { active: true})

  
    
    const canvas = this.cameraUi.querySelector('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    window.ipcRenderer.on('liveViewImage', (_event, param) => {
      const img = new Image();
      img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
      };
      img.src = param;
  });

  }

}
