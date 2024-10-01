import { dialog } from "electron";

import { injectable } from "inversify";

@injectable()
export default class BaseIpcCommunicationBridge {
  protected async showErrorDialog(messageBoxOps: any) {
    const options = {
      type: messageBoxOps.type || 'info', 
      title: messageBoxOps.title || 'Windows Live Messenger Rebirth', 
      message: messageBoxOps.message,
      buttons: messageBoxOps.buttons || ['Continuer'], 
      icon: messageBoxOps.icon || 'public/icon/msn.png' 
    };

    await dialog.showMessageBox(messageBoxOps.window, options);
  }
}
