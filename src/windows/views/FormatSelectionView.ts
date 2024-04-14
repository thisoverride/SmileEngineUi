import type { Socket } from "socket.io-client";

export default class FormatSelectionView {
  private formatSelectionScreen: HTMLElement;
  private socket: Socket;

  constructor(formatSelectionScreen: HTMLElement, socket: Socket) {
    this.formatSelectionScreen = formatSelectionScreen;
    this.socket = socket;
    this.init()
  }


  private async init() {
    const cameraCommand = { data: "stream"}

    this.socket.emit('stream',cameraCommand);
  }

  public renderView() {
    return this
  }

  public getScreen() {
    return this.formatSelectionScreen;
  }
}
