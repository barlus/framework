import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SignalCellular3Bar extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path fillOpacity=".3" d="M2 22h20V2z" /><path d="M17 7L2 22h15z" /></g>
    </Icon>
  }
}