import Modal from "../windows/component/Modal";
import { faceIdComponent } from "../windows/component/faceIdComponent";

export default class StatusBarView {
  private _controlControl: number = 0;
  private _modal: Modal;
  private _enteredCode: string = ''; 
  
  public readonly statusBar: DocumentFragment;

  constructor(statusBar: DocumentFragment, modalContainer: Modal) {
    this._modal = modalContainer;
    this.statusBar = statusBar;
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    const stateMachine = this.statusBar.getElementById('_state_machine');
    const checkPoint = this.statusBar.querySelector('#pt_control') as HTMLElement | null;


    if (checkPoint && stateMachine) {
      checkPoint.addEventListener('click', this._checkPointClick.bind(this, checkPoint));

      if(stateMachine){
        const power = stateMachine.querySelector('[name="power-off"]');
        power!.addEventListener('click', this.handleClickPower.bind(this))

        window.ipcRenderer.on('scan-network', (_event, networkDetail) => {
         const wifiIconBars: Element | null =  stateMachine.querySelector('#wave')

         if(wifiIconBars){
          let numberOfBars: number = Math.min(3, Math.ceil((networkDetail.signal_level + 100) / 40));
          console.log(numberOfBars)
          
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

      this._modal.show({title:'Face control',content: faceIdComponent});
      const digits = document.getElementById('digit');

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

  private handleClickPower(){
    this._modal.show({
      title:'Alimentation',
      content : `<div id="power" class="power">
      <box-icon size='60px' class='btn-power' name='power-off'></box-icon>
      </div>`
    })
    const power = document.getElementById('power')
    power?.addEventListener('click',()=> {
      alert('click')
      window.ipcRenderer.send('power-machine');
    })
  }

  private handleDigitClick(event: any) {
    if (event.target.tagName === 'SPAN') {
      const enteredDigit = event.target.innerText;
      if(this._modal.isReset){
        this._enteredCode += enteredDigit 
      }else {
        this._modal.isReset = true;
        this._enteredCode = '' 
        this._enteredCode += enteredDigit 
      } 

      console.log(this._enteredCode)
      if (this._enteredCode.length === 6) {

        if(this._enteredCode === '123456'){
          const adminControl = document.querySelector('._state_admin');

          if(adminControl){
            adminControl.classList.remove('hidden');
            this._modal.hide()
          }
        }else {
          this._enteredCode = '';
        }
      }
    }
  }
}
