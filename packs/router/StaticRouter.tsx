import * as React  from "@barlus/react";
import {invariant} from "@barlus/react";

import {Location} from "@barlus/history";
import {Router}   from "./Router";


const addLeadingSlash = path => {
  return path.charAt(0) === "/" ? path : "/" + path;
};

const addBasename = (basename, location) => {
  if (!basename) {
    return location;
  }

  return {
    ...location,
    pathname: addLeadingSlash(basename) + location.pathname
  };
};

const stripBasename = (basename, location) => {
  if (!basename) {
    return location;
  }

  const base = addLeadingSlash(basename);

  if (location.pathname.indexOf(base) !== 0) {
    return location;
  }

  return {
    ...location,
    pathname: location.pathname.substr(base.length)
  };
};

const createURL = location =>
  typeof location === "string" ? location : Location.createPath(location);

const staticHandler = methodName => () => {
  invariant(false, "You cannot %s with <StaticRouter>", methodName);
};

const noop = () => {
};

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */
export class StaticRouter extends React.Component<{
  basename?: string,
  context?: any,
  location: string | Location,
  history?
}> {

  static defaultProps = {
    basename: "",
    location: "/"
  };

  static childContextTypes = {
    router: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  }

  createHref = path => addLeadingSlash(this.props.basename + createURL(path));

  handlePush = location => {
    const { basename, context } = this.props;
    context.action = "PUSH";
    context.location = addBasename(basename, new Location(location));
    context.url = createURL(context.location);
  };

  handleReplace = location => {
    const { basename, context } = this.props;
    context.action = "REPLACE";
    context.location = addBasename(basename, new Location(location));
    context.url = createURL(context.location);
  };

  handleListen = () => noop;

  handleBlock = () => noop;

  componentWillMount() {
    if (this.props.history) {
      console.warn(
        "<StaticRouter> ignores the history prop. To use a custom history, " +
        "use `import { Router }` instead of `import { StaticRouter as Router }`."
      );
    }

  }

  render() {
    const { basename, context, location, ...props } = this.props;

    const history: any = {
      createHref: this.createHref,
      action: "POP",
      location: stripBasename(basename, new Location(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return <Router {...props} history={history}/>;
  }
}


