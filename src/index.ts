import { app, dialog, BrowserWindow, ipcMain } from "electron";
import { getOrCreateMainWindow } from "./main/windows";
import { ipcMainManager } from "./main/ipc";
import { IpcEvents } from "./ipc-events";
import { isDevMode } from "./utils/devmode";

let argv: string[] = [];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

/**
 * Handle the app's "ready" event. This is essentially
 * the method that takes care of booting the application.
 */
export async function onReady() {
  getOrCreateMainWindow();
}

/**
 * Handle the "before-quit" event
 *
 * @export
 */
export function onBeforeQuit() {
  ipcMainManager.send(IpcEvents.BEFORE_QUIT);
  ipcMainManager.on(IpcEvents.CONFIRM_QUIT, app.quit);
}

/**
 * All windows have been closed, quit on anything but
 * macOS.
 */
export function onWindowsAllClosed() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
}

/**
 * The main method - and the first function to run
 * when Fiddle is launched.
 *
 * Exported for testing purposes.
 */
export function main(argv_in: string[]) {
  argv = argv_in;

  // Set the app's name
  app.name = "EBJS";

  // Launch
  app.whenReady().then(onReady);
  app.on("before-quit", onBeforeQuit);
  app.on("window-all-closed", onWindowsAllClosed);
  app.on("activate", getOrCreateMainWindow);
}

// only call main() if this is the main module
if (typeof module !== "undefined" && !module.parent) {
  main(process.argv);
}
