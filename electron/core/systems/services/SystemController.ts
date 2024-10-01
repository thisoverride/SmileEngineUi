import { exec } from 'child_process';

export default class SystemController {
  
  public async reboot(): Promise<void> {
    await this._executeSystemCommand('shutdown /r /t 0', 'Failed to restart the system');
  }

  public async shutdown(): Promise<void> {
    await this._executeSystemCommand('shutdown /s /t 0', 'Failed to shutdown the system');
  }

  private async _executeSystemCommand(command: string, errorMessage: string): Promise<void> {
    try {
      const result = await this._executeCommand(command);
      console.log(`System command succeeded: ${result}`);
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`);
    }
  }

  private _executeCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Command failed: ${stderr || error.message}`));
        } else {
          resolve(stdout);
        }
      });
    });
  }
}
