export default class FormatSelectionView {
  private formatSelectionScreen: HTMLElement;
  private socket: WebSocket;

  constructor(formatSelectionScreen: HTMLElement, socket: WebSocket) {
    this.formatSelectionScreen = formatSelectionScreen;
    this.socket = socket;
    this.init()
  }


  private async init() {
    const cameraCommand = {
      context: "Stream"
    }
    const commandData: string = JSON.stringify(cameraCommand);
    this.socket.send(commandData);
  }

  public renderView() {
    return this
  }

  public getScreen() {
    return this.formatSelectionScreen;
  }
}
