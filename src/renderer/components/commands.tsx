import { Button, ControlGroup } from "@blueprintjs/core";
import { observer } from "mobx-react";
import * as React from "react";

import { AppState } from "../state";
import { Runner } from "./commands-runner";

interface CommandsProps {
  appState: AppState;
}

/**
 * The command bar, containing all the buttons doing
 * all the things
 *
 * @class Commands
 * @extends {React.Component<CommandsProps>}
 */
@observer
export class Commands extends React.Component<CommandsProps> {
  constructor(props: CommandsProps) {
    super(props);
  }

  public render() {
    const { appState } = this.props;

    return (
      <div className="commands">
        <div>
          <ControlGroup fill={true} vertical={false}>
            <Runner appState={appState} />
          </ControlGroup>
          <ControlGroup fill={true} vertical={false}>
            <Button
              active={appState.isConsoleShowing}
              icon="console"
              text="Console"
              onClick={appState.toggleConsole}
            />
          </ControlGroup>
        </div>
      </div>
    );
  }
}
