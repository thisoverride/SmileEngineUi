export default class PreviewPhotoView {
  private previewPhotoView: HTMLElement;
  private socket: WebSocket;

  constructor(previewPhotoView: HTMLElement, socket: WebSocket) {
    this.previewPhotoView = previewPhotoView;
    this.socket = socket;
    this.init()
  }


  private async init() {
    const cameraCommand = {
      context: "send_photo"
    }
    const commandData: string = JSON.stringify(cameraCommand);
    this.socket.send(commandData);

    this.socket.addEventListener('message',(e)=> {
      const img = this.previewPhotoView.querySelector('.preview') as HTMLImageElement;
      img.src = e.data
    })
  }

  public renderView() {
    return this
  }

  public getScreen() {
    return this.previewPhotoView;
  }
}
