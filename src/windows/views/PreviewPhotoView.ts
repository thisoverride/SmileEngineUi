import { Socket } from "socket.io-client";


export default class PreviewPhotoView {
  private previewPhotoView: HTMLElement;
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params:'', emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  private socket: Socket;
  private filename: string;

  constructor(previewPhotoView: HTMLElement, socket: Socket,event: any) {
    this.previewPhotoView = previewPhotoView;
    this.socket = socket;
    this.filename = event.detail.params.filename
    this.socket.on('build-code', this.handleQrcodeBuilded.bind(this));
    this.init(event);
  }


  private async init(event: any) {
    const trash = this.previewPhotoView.querySelector('.btn-trash') as HTMLElement;
    const btnValidate = this.previewPhotoView.querySelector("#validate") as HTMLElement;
    trash.addEventListener('click', this.handleDeleteEvent.bind(this));
    btnValidate.addEventListener('click',this.handleValidateEvent.bind(this));
    
    if(event.detail.params.type === 'image'){
      const display = this.previewPhotoView.querySelector('#display') as HTMLElement;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
        };
        img.src = event.detail.params.data
        display.appendChild(canvas);
        
      }else if(event.detail.params.type === 'video'){
        const titleScreen = this.previewPhotoView.querySelector('.text-indicator-selection') as HTMLElement;
        titleScreen.innerHTML = 'Valider votre Boomerang';
        const display = this.previewPhotoView.querySelector('#display') as HTMLElement;
        const video = document.createElement('video');
        const buffer = event.detail.params.data; 

        const blob = new Blob([buffer]);

        video.src = URL.createObjectURL(blob);
        video.controls = false;
        video.autoplay = true;
        video.loop = true;

        display.appendChild(video); 
      }
  }


  private handleDeleteEvent(): void {
    this.socket.emit('delete',{body: [this.filename]})
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.set = 'photoView';
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.params = 'retray';
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.emit = PreviewPhotoView.name;
    document.dispatchEvent(PreviewPhotoView.CHANGE_SCREEN_EVENT)
  }

  private handleValidateEvent(): void {
    this.socket.emit('build-code',{data:'build-qrcode'})

  }

  private handleQrcodeBuilded(event: any): void {
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.set = 'receptionSteps';
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.params = event;
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.emit = PreviewPhotoView.name;
    document.dispatchEvent(PreviewPhotoView.CHANGE_SCREEN_EVENT)
  }

  public renderView() {
    return this
  }


  public getScreen() {
    return this.previewPhotoView;
  }
}
