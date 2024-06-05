import { exec } from 'child_process';

export default class SystemController {

  public async reboot(): Promise<void> {
    try {
      await this._executeCommand('sudo shutdown -r now');
    } catch (error) {
      console.error('Failed to restart the system:', error);
    }
  }

  public async shutdown(): Promise<void> {
    try {
      await this._executeCommand('sudo shutdown now');
    } catch (error) {
      console.error('Failed to shutdown the system:', error);
    }
  }

  private _executeCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Command failed: ${stderr}`));
        } else {
          console.log(`Command succeeded: ${stdout}`);
          resolve();
        }
      });
    });
  }
}
