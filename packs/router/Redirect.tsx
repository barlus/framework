import * as React     from "@barlus/react";
import {Location}     from "@barlus/history";
import {generatePath} from "./generatePath";


/**
 * The public API for updating the location programmatically
 * with a component.
 */
export class Redirect extends React.Component<{
  computedMatch?: any;
  push?: boolean;
  from?: string;
  to?: string | any;
}> {

  static defaultProps = {
    push: false
  };

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        replace: React.PropTypes.func.isRequired
      }).isRequired,
      staticContext: React.PropTypes.object
    }).isRequired
  };

  isStatic() {
    return this.context.router && this.context.router.staticContext;
  }

  componentWillMount() {
    React.invariant(
      this.context.router,
      "You should not use <Redirect> outside a <Router>"
    );

    if (this.isStatic()) {
      this.perform();
    }
  }

  componentDidMount() {
    if (!this.isStatic()) {
      this.perform();
    }
  }

  componentDidUpdate(prevProps?) {
    const prevTo = new Location(prevProps.to);
    const nextTo = new Location(this.props.to);

    if (Location.areEqual(prevTo, nextTo)) {
      console.warn(
        `You tried to redirect to the same route you're currently on: ` +
        `"${nextTo.pathname}${nextTo.search}"`
      );
      return;
    }

    this.perform();
  }

  computeTo(props) {
    if (props.computedMatch) {
      if (typeof props.to === "string") {
        return generatePath(props.to, props.computedMatch.params);
      } else {
        return {
          ...props.to,
          pathname: generatePath(props.to.pathname, props.computedMatch.params)
        };
      }
    }
    return props.to;
  }

  perform() {
    const { history } = this.context.router;
    const { push } = this.props;
    const to = this.computeTo(this.props);

    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  }

  render() {
    return null;
  }
}

