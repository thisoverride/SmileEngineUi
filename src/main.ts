import './windows/styles/style.css';
import 'boxicons'
import WindowsController from "./controller/WindowsController"
import WindowService from './services/WindowService';

void (async() => {
  const windowsController = new WindowsController(new WindowService())
  windowsController.renderScreen()
})();

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
