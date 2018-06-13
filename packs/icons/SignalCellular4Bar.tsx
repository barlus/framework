import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SignalCellular4Bar extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M2 22h20V2z" /></g>
    </Icon>
  }
}