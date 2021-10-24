import { IpcEvents } from "../ipc-events";
import { ipcRendererManager } from "../renderer/ipc";

async function preload() {
  await setupEbjsGlobal();
}

export async function setupEbjsGlobal() {
  window.Ebjs = {
    app: null as any,
    monaco: null as any,
  };
}

preload();
