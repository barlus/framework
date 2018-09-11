import * as React         from "@barlus/react";
import {Theme}            from './theme';
import {classes}          from '../utils/classes';
import {OffCanvasOverlay} from "./OffCanvasOverlay";


export class OffCanvas extends React.PureComponent<OffCanvasProps, { active: boolean }> {

  static defaultProps = {
    active: false
  };

  constructor(props: OffCanvasProps, ctx) {
    super(props, ctx);
    const { active } = props;
    this.state = { active }
  }

  componentWillReceiveProps(nextProps) {
    const { active } = nextProps;
    if (active != this.state.active) {
      this.setState({ active })
    }
  }

  onClose = (e) => {
    this.props.onBgClick && this.props.onBgClick(e);
    this.props.closeOnBgClick && this.setState({ active: false });
  };

  render() {
    const {
      // used above
      closeOnBgClick,
      onBgClick,
      active,
      className,
      children,
      showOnLarge,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps} className={classes(Theme.offCanvas, {
        [ Theme.offCanvasSidebarShow ]: showOnLarge,
        [ Theme.active ]: this.state.active
      }, className)}>
        {children}
        <OffCanvasOverlay onClick={this.onClose}/>
      </div>
    )
  }
}

export interface OffCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  showOnLarge?: boolean,
  active?: boolean,
  closeOnBgClick?: boolean,
  onBgClick?: Function,
}