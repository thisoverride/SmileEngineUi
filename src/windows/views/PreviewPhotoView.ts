import { Socket } from "socket.io-client";

export default class PreviewPhotoView {
  private previewPhotoView: HTMLElement;
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params:'', emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  private socket: Socket;

  constructor(previewPhotoView: HTMLElement, socket: Socket,event: Event) {
    this.previewPhotoView = previewPhotoView;
    this.socket = socket;
    this.init(event)
  }


  private async init(e: any) {
    const trash = this.previewPhotoView.querySelector('.btn-trash') as HTMLElement;
    trash.addEventListener('click', this.handleDeleteEvent.bind(this));
      const canvas = this.previewPhotoView.querySelector('canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
      };
      img.src = e.detail.params
  }


  private handleDeleteEvent(): void {
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.set = 'photoView';
    PreviewPhotoView.CHANGE_SCREEN_EVENT.detail.params = 'retray';
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
