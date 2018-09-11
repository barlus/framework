import * as React      from "@barlus/react";
import {History}       from "@barlus/history";
import {MemoryHistory} from "@barlus/history";
import {Router}        from "./Router";


/**
 * The public API for a <Router> that stores location in memory.
 */
export class MemoryRouter extends React.Component<MemoryRouterProps> {

  history = new MemoryHistory(this.props);

  componentWillMount() {
    if (this.props.history) {
      console.warn(
        "<MemoryRouter> ignores the history prop. To use a custom history, " +
        "use `import { Router }` instead of `import { MemoryRouter as Router }`."
      );
    }

  }

  render() {
    return <Router history={this.history} children={this.props.children}/>;
  }
}
export interface MemoryRouterProps {
  history?: History
  initialEntries?: any[],
  initialIndex?: number,
  getUserConfirmation?(message: string): Promise<boolean>,
  keyLength?: number,
  children?: React.ReactNode
}
