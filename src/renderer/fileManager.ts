import { IpcEvents } from "../ipc-events";
import { ipcRendererManager } from "./ipc";
import { AppState } from "./state";

export class FileManager {
  constructor(private readonly appState: AppState) {
    this.openProject = this.openProject.bind(this);

    ipcRendererManager.removeAllListeners(IpcEvents.FS_OPEN_PROJECT);

    ipcRendererManager.on(IpcEvents.FS_OPEN_PROJECT, (_event, filePath) => {
      this.openProject(filePath);
    });
  }

  /**
   * Tries to open a project.
   *
   * @param {string} filePath
   * @memberof FileManager
   */
  public async openProject(filePath: string) {
    const { app } = window.Ebjs;

    console.log(`FileManager: Asked to open`, filePath);
    if (!filePath || typeof filePath !== "string") return;

    app.replaceProject({ filePath });
  }
}
