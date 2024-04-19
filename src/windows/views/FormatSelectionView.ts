import type { Socket } from "socket.io-client";

export default class FormatSelectionView {
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params:'', emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  private formatSelectionScreen: HTMLElement;
  private socket: Socket;

  constructor(formatSelectionScreen: HTMLElement, socket: Socket) {
    this.formatSelectionScreen = formatSelectionScreen;
    this.socket = socket;
    this.init()
  }


  private init() {
    const btnNextAction = this.formatSelectionScreen.querySelector('#btn-next-action') as HTMLElement;
    btnNextAction.addEventListener('click',this.onClick.bind(this));
    
  }


  private onClick(_e: Event): void {
    FormatSelectionView.CHANGE_SCREEN_EVENT.detail.set = 'photoView';
    FormatSelectionView.CHANGE_SCREEN_EVENT.detail.params = "DataFormatCollage";
    FormatSelectionView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    FormatSelectionView.CHANGE_SCREEN_EVENT.detail.emit = FormatSelectionView.name;
    document.dispatchEvent(FormatSelectionView.CHANGE_SCREEN_EVENT);
    this.socket.emit('stream',{data:'stream'})
  }

  public renderView() {
    return this
  }

  public getScreen() {
    return this.formatSelectionScreen;
  }
}
