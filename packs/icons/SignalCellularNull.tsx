import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SignalCellularNull extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z" /></g>
    </Icon>
  }
}