import * as React from "@barlus/react";
import {Route}    from "./Route";
import {Link}     from "./Link";


/**
 * A <Link> wrapper that knows if it's "active" or not.
 */

export class NavLink extends React.Component<{
  to: any;
  exact?: boolean;
  strict?: boolean
  location?: any
  activeClassName?: string
  className?: string;
  activeStyle?: any;
  style?: any;
  isActive?(match, location): boolean;
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | "true";
}> {
  static defaultProps = {
    activeClassName: "active",
    "aria-current": "page"
  };
  render() {
    const {
      to,
      exact,
      strict,
      location,
      activeClassName,
      className,
      activeStyle,
      style,
      isActive: getIsActive,
      "aria-current": ariaCurrent,
      ...rest
    } = this.props;
    const path = typeof to === "object" ? to.pathname : to;

    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

    return (
      <Route
        path={escapedPath}
        exact={exact}
        strict={strict}
        location={location}
        children={({ location, match }) => {
          const isActive = !!(getIsActive ? getIsActive(match, location) : match);
          return (
            <Link
              to={to}
              className={
                isActive
                  ? [ className, activeClassName ].filter(i => i).join(" ")
                  : className
              }
              style={isActive ? { ...style, ...activeStyle } : style}
              aria-current={(isActive && ariaCurrent) || null}
              {...rest}
            />
          );
        }}
      />
    );
  }
}