import * as React  from "@barlus/react";
import {invariant} from "@barlus/react";

import {matchPath} from "./matchPath";


/**
 * The public API for rendering the first <Route> that matches.
 */
export class Switch extends React.Component<SwitchProps> {
  static contextTypes = {
    router: React.PropTypes.shape({
      route: React.PropTypes.object.isRequired
    }).isRequired
  };

  componentWillMount() {
    invariant(
      this.context.router,
      "You should not use <Switch> outside a <Router>"
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location && !this.props.location) {
      console.warn(
        '<Switch> elements should not change from uncontrolled to controlled (or vice versa). ' +
        'You initially used no "location" prop and then provided one on a subsequent render.'
      );
    }
    if (!nextProps.location && this.props.location) {
      console.warn(
        '<Switch> elements should not change from controlled to uncontrolled (or vice versa). ' +
        'You provided a "location" prop initially but omitted it on a subsequent render.'
      );
    }

  }

  render() {
    const { route } = this.context.router;
    const { children } = this.props;
    const location = this.props.location || route.location;

    let match, child;
    React.Children.forEach(children, (element: React.ReactElement<{ path, exact, strict, sensitive, from }>) => {
      if (match == null && React.isValidElement(element)) {
        const {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from
        } = element.props;
        const path = pathProp || from;

        child = element;
        match = matchPath(
          location.pathname,
          { path, exact, strict, sensitive },
          route.match
        );
      }
    });

    return match
      ? React.cloneElement(child, { location, computedMatch: match })
      : null;
  }
}
export interface SwitchProps {
  children?: React.ReactNode,
  location?: any
}
