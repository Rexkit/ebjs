import { ChildProcess, spawn } from "child_process";
import { RunResult } from "../interfaces";
import isRunning from "is-running";

import { IpcEvents } from "../ipc-events";
import { ipcRendererManager } from "./ipc";
import { getIsPackageManagerInstalled } from "./packageManager";
import { AppState } from "./state";

export enum ForgeCommands {
  RUN = "start",
  PACKAGE = "package",
  MAKE = "make",
}

const resultString: Record<RunResult, string> = Object.freeze({
  [RunResult.FAILURE]: "❌ failed",
  [RunResult.INVALID]: "❓ invalid",
  [RunResult.SUCCESS]: "✅ passed",
});

export class Runner {
  public child: ChildProcess | null = null;

  constructor(private readonly appState: AppState) {
    this.run = this.run.bind(this);
    this.stop = this.stop.bind(this);

    ipcRendererManager.removeAllListeners(IpcEvents.PROJECT_RUN);
    ipcRendererManager.removeAllListeners(IpcEvents.PROJECT_PACKAGE);
    ipcRendererManager.removeAllListeners(IpcEvents.PROJECT_MAKE);

    ipcRendererManager.on(IpcEvents.PROJECT_RUN, this.run);
    // ipcRendererManager.on(IpcEvents.PROJECT_PACKAGE, () => {
    //   this.performForgeOperation(ForgeCommands.PACKAGE);
    // });
    // ipcRendererManager.on(IpcEvents.PROJECT_MAKE, () => {
    //   this.performForgeOperation(ForgeCommands.MAKE);
    // });
  }

  /**
   * Stop a currently running Electron app.
   *
   * @returns {boolean} true if runner is now idle
   * @memberof Runner
   */
  public stop(): void {
    this.appState.isRunning = !!this.child && !this.child.kill();

    // If the child process is still alive 1 second after we've
    // attempted to kill it by normal means, kill it forcefully.
    setTimeout(() => {
      const pid = this.child?.pid;
      if (pid && isRunning(pid)) {
        this.child?.kill("SIGKILL");
      }
    }, 1000);
  }

  /**
   * Actually run the app.
   *
   * @returns {Promise<RunResult>}
   */
  public async run(): Promise<RunResult> {
    const { appState } = this;

    const dir = appState.currentProjectDir;

    if (!dir) return RunResult.INVALID;

    return this.execute(dir);
  }

  /**
   * Execute Electron App.
   *
   * @param {string} dir
   * @returns {Promise<void>}
   * @memberof Runner
   */
  public async execute(dir: string): Promise<RunResult> {
    const { pushOutput } = this.appState;
    const { packageManager } = this.appState;

    if (!getIsPackageManagerInstalled(packageManager)) return RunResult.INVALID;

    console.log(`Runner: launching`);

    const options =
      packageManager === "npm"
        ? [ForgeCommands.RUN]
        : ["run", ForgeCommands.RUN];

    return new Promise((resolve, _reject) => {
      this.child = spawn(packageManager, options, { cwd: dir });
      this.appState.isRunning = true;
      pushOutput(`Electron app started.`);

      this.child.stdout!.on("data", (data) => pushOutput(data));
      this.child.stderr!.on("data", (data) => pushOutput(data));
      this.child.on("close", async (code, signal) => {
        this.appState.isRunning = false;
        this.child = null;

        if (typeof code !== "number") {
          pushOutput(`Electron exited with signal ${signal}.`);
          resolve(RunResult.INVALID);
        } else {
          pushOutput(`Electron exited with code ${code}.`);
          resolve(!code ? RunResult.SUCCESS : RunResult.FAILURE);
        }
      });
    });
  }
}
