import "../../static/css/index.css";

import * as monaco from "monaco-editor";
import { App } from "./app";

(() => {
  window.Ebjs.monaco = monaco;
  window.Ebjs.app = new App();
  window.Ebjs.app.setup();
})();
