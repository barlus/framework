import * as React       from "@barlus/react";
import {BrowserHistory} from "@barlus/history";
import {HistoryProps}   from "@barlus/history";
import {Router}         from "./Router";


/**
 * The public API for a <Router> that uses HTML5 history.
 */
export class BrowserRouter extends React.Component<Partial<HistoryProps>> {
  private history = new BrowserHistory(this.props);
  render() {
    return <Router history={this.history} children={this.props.children}/>;
  }
}
