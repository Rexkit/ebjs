import { ipcRenderer } from "electron";
import { ipcRendererManager } from "./ipc";
import { WEBCONTENTS_READY_FOR_IPC_SIGNAL, IpcEvents } from "../ipc-events";
import { AppState } from "./state";
import { Runner } from "./runner";
import { FileManager } from "./fileManager";
import { SetProjectOptions } from "../interfaces";

/**
 * The top-level class controlling the whole app.
 *
 * @class App
 */
export class App {
  public state = new AppState();
  public runner = new Runner(this.state);
  public fileManager = new FileManager(this.state);

  constructor() {}

  public async setup(): Promise<void | Element | React.Component> {
    const React = await import("react");
    const { render } = await import("react-dom");

    const { Header } = await import("./components/Header");

    const className = `${process.platform} container`;
    const app = (
      <div className={className}>
        <Header appState={this.state} />
      </div>
    );

    const rendered = render(app, document.getElementById("app"));

    ipcRenderer.send(WEBCONTENTS_READY_FOR_IPC_SIGNAL);

    return rendered;

    // window.Ebjs.monaco.editor.create(document.getElementById("editor"), {
    //   value: "yarn start",
    //   language: "shell",
    //   theme: "vs-dark",
    // });
  }

  public async replaceProject({ filePath }: Partial<SetProjectOptions>) {
    this.state.localPath = filePath;
    return true;
  }

  /**
   * Opens a project from the specified location.
   *
   * @param {SetProjectOptions} the project to open
   */
  public async openProject(project: SetProjectOptions) {
    const { filePath } = project;
    if (filePath) {
      await this.fileManager.openProject(filePath);
    }
  }
}
