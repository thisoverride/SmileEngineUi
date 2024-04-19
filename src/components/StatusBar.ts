export default class StatusBar {
  private readonly statusBar: DocumentFragment;
  private pointControl: number = 0;
  private passwordCounter: number = 0;
  private inputPassword: string = '';
  private tentative: number = 1
 
  constructor(statusBar: DocumentFragment) {
    this.statusBar = statusBar;
    this.init();
  }

  public init(): void {
    const stateMachine = this.statusBar.getElementById("_state_machine");
    const checkPoint = this.statusBar.querySelector("#pt_control") as HTMLElement;
    const modalButton = this.statusBar.querySelector(".btn-mle") as HTMLElement;
    const overlay = this.statusBar.querySelector(".md-overlay") as HTMLElement;
    const digits = this.statusBar.getElementById("digit") as HTMLElement;

    modalButton.addEventListener("click", () =>this.modalControlVisibility(false));
    overlay.addEventListener("click", () => this.modalControlVisibility(false));

    if (checkPoint && stateMachine) {
      checkPoint.addEventListener("click",this._checkPointClick.bind(this, checkPoint, digits));

      if (stateMachine) {
        // const power = stateMachine.querySelector('[name="power-off"]');
        // power!.addEventListener('click', this.handleClickPower.bind(this))

        window.ipcRenderer.on("scan-network", (_event, networkDetail) => {
          const wifiIconBars: Element | null =
            stateMachine.querySelector("#wave");

          if (wifiIconBars) {
            let numberOfBars: number = Math.min(3,
              Math.ceil((networkDetail.signal_level + 100) / 40));
            isNaN(numberOfBars)
              ? (numberOfBars = 1)
              : (numberOfBars = numberOfBars);
            wifiIconBars.className = "";
            wifiIconBars.classList.add(`waveStrength-${numberOfBars}`);
          }
        });
      }
    }
  }

  private _checkPointClick(checkPoint: HTMLElement, digits: HTMLElement): void  {
    this.pointControl += 1;

    if (this.pointControl === 1) {
      checkPoint.classList.add("crl_pos-1");
    } else if (this.pointControl === 2) {
      checkPoint.classList.remove("crl_pos-1");
      checkPoint.classList.add("crl_pos-2");
    } else if (this.pointControl === 3) {
      this.pointControl = 0;
      checkPoint.classList.remove("crl_pos-2");
      checkPoint.classList.add("crl_pos-0");

      this.modalControlVisibility(true);

      if (digits) {
        digits.addEventListener("click", this.handleDigitClick.bind(this));
      }
    }

    const resetDelay: number = 3000;
    setTimeout(() => {
      this.pointControl = 0;
      checkPoint.classList.remove("crl_pos-1", "crl_pos-2");
      checkPoint.classList.add("crl_pos-0");
    }, resetDelay);
  }

  private handleDigitClick(event: any): void {
    const indicator = document.querySelectorAll(".indicator-circle");

    if (event.target.tagName === "SPAN") {
        const circle = indicator[this.passwordCounter] as HTMLElement;

        if (this.passwordCounter < indicator.length) {
            this.inputPassword += event.target.id;
            circle.style.backgroundColor = "#ffff";
            this.passwordCounter++;
            
            if (this.passwordCounter === indicator.length) {
                if (this.inputPassword === '123456') {
                    alert('Panier déverrouillé');
                } else {
                  setTimeout(() => {
                    indicator.forEach(item => (item as HTMLElement).style.backgroundColor = "transparent");
                    indicator[0].parentElement!.classList.add('animate__animated', 'animate__shakeX');
                    this.tentative += 1
                    this.passwordCounter = 0;
                    this.inputPassword = '';
                    console.log(this.tentative)
                    this.tentative > 3 ? this.lockAccess() : '';
                  }, 500);
                  indicator[0].parentElement!.classList.remove('animate__animated', 'animate__shakeX');
                }
            }
        }
    }
}

  private modalControlVisibility(isOpen: boolean): void {
    const mleWrapper = document.querySelector(".mle-system-wrp");
    const overlay = document.querySelector(".md-overlay");
    const passwordWrapper = document.querySelector('.pass-indicator');

    if (mleWrapper && overlay && isOpen) {
      overlay.classList.remove("hidden");
      mleWrapper.classList.remove("hidden");
      mleWrapper.classList.remove('animate__animated',"animate__fadeOut","animate__faster");
      mleWrapper.classList.add('animate__animated',"animate__fadeIn","animate__faster");
      passwordWrapper!.classList.remove('animate__animated', 'animate__shakeX');
    }
    if (mleWrapper && overlay && !isOpen) {
      passwordWrapper!.classList.remove('animate__animated', 'animate__shakeX');
      this.passwordCounter = 0;
      this.inputPassword = '';
      mleWrapper.classList.remove('animate__animated',"animate__fadeIn","animate__faster");
      mleWrapper.classList.add('animate__animated',"animate__fadeOut","animate__faster");
      overlay.classList.add("hidden");
    }
  }

  public getStatusBarElement(): DocumentFragment {
    return this.statusBar;
  }

  private lockAccess(){
      const modalDigits = document.querySelector('.digit-wrp')
      const antiForcePassword = document.querySelector('.anti-force-password')
    
      if(modalDigits && antiForcePassword){
        modalDigits.classList.add('v-hidden');
        antiForcePassword.classList.add('v-visible');
      }
  }
}
