import { App } from "./renderer/app";
import * as MonacoType from "monaco-editor";

declare global {
  interface Window {
    Ebjs: {
      app: App;
      monaco: typeof MonacoType;
    };
  }
}
