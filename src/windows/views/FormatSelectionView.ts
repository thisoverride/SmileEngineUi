import type { Socket } from "socket.io-client";
export default class FormatSelectionView {
  private static readonly CHANGE_SCREEN_EVENT = new CustomEvent('changeScreen', {
    detail: { set: '', params:'', emit: '',scope: '' }, bubbles: true, cancelable: true
  });
  private formatSelectionScreen: HTMLElement;
  private socket: Socket;
  private titleScreen: HTMLElement;
  private btnNextAction: HTMLElement;

  constructor(formatSelectionScreen: HTMLElement, socket: Socket) {
    this.formatSelectionScreen = formatSelectionScreen;
    this.titleScreen = this.formatSelectionScreen.querySelector('#indicator-selection') as HTMLElement;
    this.btnNextAction = this.formatSelectionScreen.querySelector('#btn-action-next') as HTMLElement;
    this.socket = socket;
    this.init();

  }

  private init(): void {
    this.setupOrientationButtons();
    this.setupActionButtons();
    this.titleScreen.innerHTML = "Sélectionnez un format :";
  }

  private setupOrientationButtons(): void {
    const landscape = this.formatSelectionScreen.querySelector('#landscape');
    const portrait = this.formatSelectionScreen.querySelector('#portrait');

    landscape!.addEventListener('click', this.onClickOrientation.bind(this));
    portrait!.addEventListener('click', this.onClickOrientation.bind(this));
  }

  private setupActionButtons(): void {
    const btnReturnAction = this.formatSelectionScreen.querySelector('#btn-action-return') as HTMLElement;
    this.btnNextAction.addEventListener('click', this.onClick.bind(this));    
    btnReturnAction.addEventListener('click', this.onClickReturn.bind(this));
  }

  private onClickOrientation(e: Event): void {
    const collage = this.formatSelectionScreen.querySelector('.collage') as HTMLElement;
    const orientation = this.formatSelectionScreen.querySelector('#orientation') as HTMLElement;
    collage.style.display = "flex";
    orientation.classList.add('hidden');
    this.titleScreen.innerHTML = "Sélectionnez votre collage :"
    const targetElement = e.target as HTMLElement;
    this.showTemplate(targetElement.id);
  }

  private showTemplate(orientationID: string): void {
    if (orientationID === 'landscape') {
    this.btnNextAction.classList.remove('v-hidden');
    } else {
      this.btnNextAction.classList.remove('v-hidden');
    }
  }

  private onClick(_e: Event): void {
    this.dispatchEventWithChangeScreenEvent('photoView');
    this.socket.emit('stream', { data: 'photo-stream' });
  }

  private onClickReturn(_e: Event): void {
    const orientation = this.formatSelectionScreen.querySelector('#orientation') as HTMLElement;
    const collage = this.formatSelectionScreen.querySelector('.collage') as HTMLElement;

    if (orientation.classList.contains("hidden") && !this.btnNextAction.classList.contains('v-hidden')) {
      this.btnNextAction.classList.add('v-hidden')
      collage.style.display = "none";
      orientation.classList.remove('hidden')
    } else {
      this.dispatchEventWithChangeScreenEvent('selectionView');
      this.socket.emit('stream', { data: 'stream' });
    }
  }

  private dispatchEventWithChangeScreenEvent(setValue: string): void {
    FormatSelectionView.CHANGE_SCREEN_EVENT.detail.set = setValue;
    FormatSelectionView.CHANGE_SCREEN_EVENT.detail.params = "DataFormatCollage";
    FormatSelectionView.CHANGE_SCREEN_EVENT.detail.scope = "USR_CRL";
    FormatSelectionView.CHANGE_SCREEN_EVENT.detail.emit = FormatSelectionView.name;
    document.dispatchEvent(FormatSelectionView.CHANGE_SCREEN_EVENT);
  }

  public renderView(): FormatSelectionView {
    return this;
  }

  public getScreen(): HTMLElement {
    return this.formatSelectionScreen;
  }
}
