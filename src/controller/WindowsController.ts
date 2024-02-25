import WindowService from "../services/WindowService";
import { modeSelection } from "../windows/screens/modeSelection";
import { saverScreen } from "../windows/screens/saverScreen";
import { splashScreen } from "../windows/screens/splashScreen";
import { modalFaceID } from "../windows/component/modalFaceID";


export default class WindowsController {
  private _app: HTMLElement | null;
  private _windowService: WindowService;

  constructor(windowService: WindowService){
    this._app = null;
    this._windowService = windowService;
  }

  /**
   * Checks the application context and performs actions accordingly.
   * @method
   * @returns {void}
   */
  public async renderScreen(): Promise<void> {
    await this._domReady().then(()=>{
      const structure = this._windowService.initializationUi(modalFaceID(),'<div id="app"></div>');
      document.getElementById('root')!.appendChild(structure)
      this._app = document.getElementById('app')
      this._app ? this._renderSplashScreen() : ''
    })
  }

  /**
   * Renders the splash screen.
   * @method
   * @returns {void}
   */
  private _renderSplashScreen(): void {
    this._app!.innerHTML = splashScreen();
    setTimeout(()=> {
      this._app!.innerHTML = '';
      this._renderSaverScreen()
    },1000)
  }

  private _renderSaverScreen(): void {
    const statusBar = this._windowService.setStatusBar()
    document.getElementById('root')!.appendChild(statusBar)
    const screen = this._windowService.buildSaverScreen(saverScreen())
    this._app!.appendChild(screen)

  }

  /**
   * Waits for the DOM to be ready.
   * @method
   * @param {DocumentReadyState[]} [condition] - List of document ready states to wait for.
   * @returns {Promise<boolean>} - Resolved once the DOM is ready.
   */
  private async _domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
    return new Promise(resolve => {
      if (condition.includes(document.readyState)) {
        resolve(true)
      } else {
        document.addEventListener('readystatechange', () => {
          if (condition.includes(document.readyState)) {
            resolve(true)
          }
        })
      }
    })
  }
}