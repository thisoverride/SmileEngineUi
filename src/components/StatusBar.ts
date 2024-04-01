export default class StatusBar {
  private readonly statusBar: DocumentFragment;
  private _controlControl: number = 0;

  constructor(statusBar: DocumentFragment) {
    this.statusBar = statusBar;
    this.init()
  }

  public init(): void {
    const stateMachine = this.statusBar.getElementById('_state_machine');
    const checkPoint = this.statusBar.querySelector('#pt_control') as HTMLElement | null;
    const modalButton = this.statusBar.querySelector('.btn-mle') as HTMLElement;
    const overlay = this.statusBar.querySelector('.md-overlay') as HTMLElement;
    
    modalButton.addEventListener('click', () => this.modalControl(false))
    overlay.addEventListener('click', () => this.modalControl(false))

    if (checkPoint && stateMachine) {
      checkPoint.addEventListener('click', this._checkPointClick.bind(this, checkPoint));

      if(stateMachine){
        const power = stateMachine.querySelector('[name="power-off"]');
        // power!.addEventListener('click', this.handleClickPower.bind(this))

        window.ipcRenderer.on('scan-network', (_event, networkDetail) => {
         const wifiIconBars: Element | null =  stateMachine.querySelector('#wave')

         if(wifiIconBars){
          let numberOfBars: number = Math.min(3, Math.ceil((networkDetail.signal_level + 100) / 40));          
          isNaN(numberOfBars) ? numberOfBars = 1 : numberOfBars = numberOfBars
          wifiIconBars.className = '';
          wifiIconBars.classList.add(`waveStrength-${numberOfBars}`);
         }
        })
      }
    }
    
  }

  private _checkPointClick(checkPoint: HTMLElement) {
    this._controlControl += 1;

    if (this._controlControl === 1) {
      checkPoint.classList.add('crl_pos-1');

    } else if (this._controlControl === 2) {
      checkPoint.classList.remove('crl_pos-1');
      checkPoint.classList.add('crl_pos-2');

    } else if (this._controlControl === 3) {
      this._controlControl = 0;
      checkPoint.classList.remove('crl_pos-2');
      checkPoint.classList.add('crl_pos-0');

      this.modalControl(true)
      const digits = this.statusBar.getElementById('digit');

      if(digits){
        digits.addEventListener('click', this.handleDigitClick.bind(this));
      }
    
    }

    const resetDelay: number = 3000;
    setTimeout(() => {
      this._controlControl = 0;
      checkPoint.classList.remove('crl_pos-1', 'crl_pos-2');
      checkPoint.classList.add('crl_pos-0');
    }, resetDelay);
  }

  private modalControl(isOpen: boolean):void {
    const mleWrapper =  document.querySelector('.mle-system-wrp');
    const overlay = document.querySelector('.md-overlay');
    
    if(mleWrapper && overlay && isOpen){
      mleWrapper.classList.remove('hidden');
      overlay.classList.remove('hidden');
    }
    if( mleWrapper && overlay && !isOpen){
      mleWrapper.classList.add('hidden');
      overlay.classList.add('hidden');
    }
  }

  public getStatusBarElement() : DocumentFragment {
    return this.statusBar;
  }
}
