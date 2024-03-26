import WindowsController from "./controller/WindowsController"
import WindowService from './services/WindowService';
import DOMService from './services/DOMService';
import './windows/styles/normalize.css';
import './windows/styles/helpers.css';
import './windows/styles/style.css';
import 'boxicons'

void (async() => {
    const windowsController: WindowsController = new WindowsController(new WindowService(new DOMService()))
    await windowsController.setupEngine();
    
})();
// postMessage({ payload: 'removeLoading' }, '*')


