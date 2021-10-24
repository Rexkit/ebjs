import { action, autorun, computed, observable, when } from "mobx";
import { IpcEvents } from "../ipc-events";
import { OutputEntry } from "../interfaces";
import { ipcRendererManager } from "./ipc";
import { IPackageManager } from "./packageManager";

export class AppState {
  @observable public packageManager: IPackageManager =
    (localStorage.getItem("packageManager") as IPackageManager) || "npm";
  @observable public output: Array<OutputEntry> = [];
  @observable public currentProjectDir: string | null = null;
  @observable public isRunning = false;
  @observable public localPath: string | undefined;
  @observable public isConsoleShowing = false;

  constructor() {
    this.pushError = this.pushError.bind(this);
    this.pushOutput = this.pushOutput.bind(this);
    this.clearConsole = this.clearConsole.bind(this);
    this.toggleConsole = this.toggleConsole.bind(this);

    autorun(() => this.save("packageManager", this.packageManager ?? "npm"));

    this.pushOutput("Console ready 🔬");
  }

  @action public toggleConsole() {
    this.isConsoleShowing = !this.isConsoleShowing;
  }

  /**
   * Push output to the application's state. Accepts a buffer or a string as input,
   * attaches a timestamp, and pushes into the store.
   *
   * @param {(string | Buffer)} data
   */
  @action public pushOutput(data: string) {
    let strData = data.toString();

    const entry: OutputEntry = {
      text: strData.trim(),
    };

    ipcRendererManager.send(IpcEvents.OUTPUT_ENTRY, entry);
    this.output.push(entry);
  }

  /**
   * Little convenience method that pushes message and error.
   *
   * @param {string} message
   * @param {Error} error
   */
  @action public pushError(message: string, error: Error) {
    this.pushOutput(`⚠️ ${message}. Error encountered:`);
    this.pushOutput(error.toString());
    console.warn(error);
  }

  @action public clearConsole() {
    this.output = [];
  }

  /**
   * Save a key/value to localStorage.
   *
   * @param {string} key
   * @param {(string | number | object)} [value]
   */
  private save(
    key: string,
    value?:
      | string
      | number
      | Array<any>
      | Record<string, unknown>
      | null
      | boolean
  ) {
    if (value !== null && value !== undefined) {
      const _value =
        typeof value === "object" ? JSON.stringify(value) : value.toString();

      localStorage.setItem(key, _value);
    } else {
      localStorage.removeItem(key);
    }
  }

  /**
   * Fetch data from localStorage.
   *
   * @template T
   * @param {string} key
   * @returns {(T | string | null)}
   */
  private retrieve<T>(key: string): T | string | null {
    const value = localStorage.getItem(key);

    return JSON.parse(value || "null") as T;
  }
}
