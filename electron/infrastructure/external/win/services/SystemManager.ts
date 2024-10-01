import { exec } from 'child_process';
import { injectable } from 'inversify';

@injectable()
export default class SystemManager {

  public async reboot(): Promise<void> {
    try {
      await this._executeCommand('shutdown /r /t 0');
    } catch (error) {
      console.error('Failed to restart the system:', error);
    }
  }

  public async shutdown(): Promise<void> {
    try {
      await this._executeCommand('shutdown /s /t 0');
    } catch (error) {
      console.error('Failed to shutdown the system:', error);
    }
  }

  private _executeCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Command failed: ${stderr || error.message}`));
        } else {
          console.log(`Command succeeded: ${stdout}`);
          resolve();
        }
      });
    });
  }
}
