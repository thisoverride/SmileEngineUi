import { contextBridge, ipcRenderer } from 'electron';
import { splashScreen } from '../src/views/main/screenView/splashScreen';
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  }, 
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

})



contextBridge.exposeInMainWorld('boothSys', {
  capture: (ctx: string) => ipcRenderer.invoke('camera:capture',ctx),
  powerOff: () => ipcRenderer.invoke('system:shutdown'),
  reboot: () => ipcRenderer.invoke('system:reboot'),
});

// --------- Preload scripts loading ---------
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
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

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      parent.removeChild(child)
    }
  },
}

function useLoading() {
 
  const styleContent = `
  .app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; 
  justify-content: center;
  background: #000;
  z-index: 9;
}
#ico-smile-engine{
  height: 350px;
  width: 100%;
}
.splash {
  gap: 30px;
  flex-direction : column;
  display: flex;
}
.progress-container {
  height: 4px;
  border-radius: 3px;
  background-color: #2c2c2c;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background-color: #bfbfbf;
  transition: width 0.5s ease;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = splashScreen;
  const progressBar: HTMLElement | null = oDiv.querySelector('#progress');

  if (progressBar) {
    progressBar.parentElement!.style.visibility = 'hidden';
    progressBar.style.width = '0%';
  }

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    async removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)

      // const config = await EventService.loadConfig()
      // new Main(document.getElementById('root')!, config)

    },
  }
}

// ----------------------------------------------------------------------

ipcRenderer.send('play-sound-effect', 'startup')
const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)



window.onmessage = ev => {
  setTimeout(() => {
    ev.data.payload === 'removeLoading' && removeLoading()
    
  }, 2500);
  
  const progressBar: HTMLElement | null = document.querySelector('#progress');
  if (progressBar) {
    progressBar.parentElement!.style.display = 'block';
    setTimeout(() => progressBar.style.width = `${ev.data.progressUpdate}%`, 1000);
  }
}
setTimeout(removeLoading, 4000)
