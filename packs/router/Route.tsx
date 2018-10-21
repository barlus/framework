import * as React  from "@barlus/react";
import {matchPath} from "./matchPath";


const isEmptyChildren = children => React.Children.count(children) === 0;

/**
 * The public API for matching a single path and rendering.
 */
export class Route extends React.Component<{
  computedMatch?: any;
  path?: string;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
  component?: any;
  render?(props);
  children?: React.ReactNode | ((props?) => React.ReactElement<any>);
  location?: any;
}> {
  static propTypes = {
    computedMatch: React.PropTypes.object, // private, from <Switch>
    path: React.PropTypes.string,
    exact: React.PropTypes.bool,
    strict: React.PropTypes.bool,
    sensitive: React.PropTypes.bool,
    component: React.PropTypes.func,
    render: React.PropTypes.func,
    children: React.PropTypes.oneOfType([ React.PropTypes.func, React.PropTypes.node ]),
    location: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
      route: React.PropTypes.object.isRequired,
      staticContext: React.PropTypes.object
    })
  };

  static childContextTypes = {
    router: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      router: {
        ...this.context.router,
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      }
    };
  }

  state = {
    match: this.computeMatch(this.props as any, this.context.router)
  };

  computeMatch(
    { computedMatch, location, path, strict, exact, sensitive },
    router
  ) {
    if (computedMatch) {
      return computedMatch;
    } // <Switch> already computed the match for us

    React.invariant(
      router,
      "You should not use <Route> or withRouter() outside a <Router>"
    );

    const { route } = router;
    const pathname = (location || route.location).pathname;

    return matchPath(pathname, { path, strict, exact, sensitive }, route.match);
  }

  componentWillMount() {
    if (this.props.component && this.props.render) {
      console.warn(
        "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"
      );
    }
    if (
      this.props.component &&
      this.props.children &&
      !isEmptyChildren(this.props.children)
    ) {
      console.warn(
        "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored"
      );
    }
    if (
      this.props.render &&
      this.props.children &&
      !isEmptyChildren(this.props.children)
    ) {
      console.warn(
        "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored"
      );
    }
  }

  componentWillReceiveProps(nextProps, nextContext?) {
    if (nextProps.location && !this.props.location) {
      console.warn(
        '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
      );
    }
    if (!nextProps.location && this.props.location) {
      console.warn(
        '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
      );
    }

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  }

  render() {
    const { match } = this.state;
    const { children, component, render } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;
    const props = { match, location, history, staticContext };
    if (component) {
      return match ? React.createElement(component, props) : null;
    }

    if (render) {
      return match ? render(props) : null;
    }

    if (typeof children === "function") {
      return (children as any)(props);
    }

    if (children && !isEmptyChildren(children)) {
      return React.Children.only(children);
    }

    return null;
  }
}

