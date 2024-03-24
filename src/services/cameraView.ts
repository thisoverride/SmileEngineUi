
export default class cameraView {
  public cameraUi: DocumentFragment;
  
  constructor(feature: DocumentFragment) {
    this.cameraUi = feature;
    this.setup()
  }


  public async setup() {
    console.log('ici')
    const test = this.cameraUi.querySelector('#aled')
    // const test2 = this.homeUi.querySelector('#waled')

    test!.addEventListener(('click'), () => {
      window.ipcRenderer.send('triggerCamera')
    })
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
