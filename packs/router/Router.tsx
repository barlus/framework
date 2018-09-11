import * as React  from "@barlus/react";
import {invariant} from "@barlus/react";
import {History}   from "@barlus/history";


/**
 * The public API for putting history on context.
 */
export class Router extends React.Component<{ history?: History, children?: React.ReactNode }> {

  static contextTypes = {
    router: React.PropTypes.object
  };

  static childContextTypes = {
    router: React.PropTypes.object.isRequired
  };
  private unlisten: any;
  getChildContext() {
    return {
      router: {
        ...this.context.router,
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      }
    };
  }

  state = {
    match: this.computeMatch(this.props.history.location.pathname)
  };

  computeMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  }

  componentWillMount() {
    const { children, history } = this.props;

    invariant(
      children == null || React.Children.count(children) === 1,
      "A <Router> may have only one child element"
    );

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(() => {
      this.setState({
        match: this.computeMatch(history.location.pathname)
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.history !== nextProps.history) {
      console.warn("You cannot change <Router history>");
    }

  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}

