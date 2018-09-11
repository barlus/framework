import * as React     from "@barlus/react";
import {HashHistory}  from "@barlus/history";
import {HistoryProps} from "@barlus/history";
import {Router}       from "./Router";


/**
 * The public API for a <Router> that uses window.location.hash.
 */
export class HashRouter extends React.Component<Partial<HistoryProps>> {
  history = new HashHistory(this.props);
  render() {
    return <Router history={this.history} children={this.props.children}/>;
  }
}
