import PhotoOrientationViewScreen from "./screenView/PhotoOrientationViewScreen";

export default class PhotoOrientationView extends PhotoOrientationViewScreen {


  private _initView(element: HTMLElement): void { 
    window.app.changeTitle('Sélectionnez un format :')
    window.app.setFooter(element)
    const btnNavigationReturn = document.getElementById('return');
    const btnNavigationNext = document.getElementById('next');
    btnNavigationNext?.addEventListener('click', this._handleNext)
    btnNavigationReturn?.addEventListener('click', this._handleReturn);
  }

  public render() {
    const { body , footer } = this.renderTemplate();
    const oriantation = body.querySelectorAll('#oriantation-group')
    
    oriantation.forEach((format) => {
      format.addEventListener('click',() => {
       const nextbtn = document.querySelector('#next')
       if(nextbtn?.classList.contains('v-hidden')){
        nextbtn.classList.remove('v-hidden')
       }
      })
    })
    this._initView(footer);
    return body as HTMLElement;
  }

  private _handleReturn(_event: Event): void {
    window.app.clear('.layout-footer')
    window.navigation.changeView('captureModeSelectionView')
  }
  private _handleNext(_event: Event): void {
    window.app.clear('.layout-footer');
    window.navigation.changeView('CameraViewScreen');
  }
}

