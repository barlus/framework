import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Eject extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z" /></g>
    </Icon>
  }
}