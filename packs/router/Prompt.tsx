import * as React from "@barlus/react";


/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */
export class Prompt extends React.Component<{ when?: boolean, message: Function | string }> {
  static propTypes = {
    when: React.PropTypes.bool,
    message: React.PropTypes.oneOfType([ React.PropTypes.func, React.PropTypes.string ]).isRequired
  };

  static defaultProps = {
    when: true
  };

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.shape({
        block: React.PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  };
  unblock?();
  enable(message) {
    if (this.unblock) {
      this.unblock();
    }
    this.unblock = this.context.router.history.block(message);
  }

  disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  }

  componentWillMount() {
    React.invariant(
      this.context.router,
      "You should not use <Prompt> outside a <Router>"
    );

    if (this.props.when) {
      this.enable(this.props.message);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) {
        this.enable(nextProps.message);
      }
    } else {
      this.disable();
    }
  }

  componentWillUnmount() {
    this.disable();
  }

  render() {
    return null;
  }
}

