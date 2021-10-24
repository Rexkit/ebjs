import * as React from "react";

import { AppState } from "../state";
import { Commands } from "./commands";

interface HeaderProps {
  appState: AppState;
}

/**
 * Everything above the editor, so buttons and the address bar.
 *
 * @class Header
 * @extends {React.Component<HeaderProps>}
 */
export class Header extends React.Component<HeaderProps> {
  public render() {
    return (
      <>
        <header id="header">
          <Commands key="commands" appState={this.props.appState} />
        </header>
      </>
    );
  }
}
