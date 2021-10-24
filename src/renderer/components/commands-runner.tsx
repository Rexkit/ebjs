import { Button, ButtonProps, Spinner } from "@blueprintjs/core";
import { observer } from "mobx-react";
import * as React from "react";

import { AppState } from "../state";

interface RunnerProps {
  appState: AppState;
}

/**
 * The runner component is responsible for actually launching the fiddle
 * with Electron. It also renders the button that does so.
 *
 * @class Runner
 * @extends {React.Component<RunnerProps>}
 */
@observer
export class Runner extends React.Component<RunnerProps> {
  public render() {
    const { isRunning } = this.props.appState;

    const props: ButtonProps = { className: "button-run", disabled: true };

    props.text = "Run";
    props.onClick = window.Ebjs.app.runner.run;
    props.icon = "play";

    return <Button {...props} type={undefined} />;
  }
}
