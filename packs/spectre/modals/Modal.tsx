import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


class Portal extends React.PureComponent<any, any> {
  private el: HTMLElement;

  constructor(props, context?) {
    super(props, context);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return React.createPortal(
      this.props.children as any,
      this.el
    );
  }
}

export class Modal extends React.PureComponent<ModalProps, { close: boolean }> {
  static defaultProps = {
    open: true,
  };

  handleOnBackgroundClick = (e) => {
    this.props.onBackgroundClick && this.props.onBackgroundClick(e);
  };

  render() {
    const {
      //used above
      onBackgroundClick,
      className,
      open,
      large,
      small,
      children,
      ...otherProps
    } = this.props;

    return (open && <Portal>
      <div {...otherProps} className={classes(Theme.modal, Theme.active, {
        [ Theme.modalSm ]: small,
        [ Theme.modalLg ]: large
      }, className)}>
        <a className={Theme.modalOverlay} onClick={this.handleOnBackgroundClick}/>
        <div className={Theme.modalContainer}>
          {children}
        </div>
      </div>
    </Portal>)
  }

}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean,
  small?: boolean
  large?: boolean
  onBackgroundClick?: Function
}