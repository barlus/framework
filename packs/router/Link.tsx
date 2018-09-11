import * as React from "@barlus/react";
import {Location} from "@barlus/history";


const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

/**
 * The public API for rendering a history-aware <a>.
 */
export class Link extends React.Component<LinkProps> {
  static propTypes = {
    onClick: React.PropTypes.func,
    target: React.PropTypes.string,
    replace: React.PropTypes.bool,
    to: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.object ]).isRequired,
    innerRef: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.func ])
  };

  static defaultProps = {
    replace: false
  };

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        replace: React.PropTypes.func.isRequired,
        createHref: React.PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  };

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      const { history } = this.context.router;
      const { replace, to } = this.props;

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  };

  render() {
    const { replace, to, innerRef, ...props } = this.props; // eslint-disable-line no-unused-vars

    React.invariant(
      this.context.router,
      "You should not use <Link> outside a <Router>"
    );

    React.invariant(to !== undefined, 'You must specify the "to" property');

    const { history } = this.context.router;
    const location =
      typeof to === "string"
        ? new Location(to, null, null, history.location)
        : to;

    const href = history.createHref(location);
    return (
      <a {...props} onClick={this.handleClick} href={href} ref={innerRef}/>
    );
  }
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string
  onClick?: React.MouseEventHandler
  target?: any;
  replace?: any;
  to?: any;
  innerRef?()
}