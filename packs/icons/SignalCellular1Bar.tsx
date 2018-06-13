import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SignalCellular1Bar extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path fillOpacity=".3" d="M2 22h20V2z" /><path d="M12 12L2 22h10z" /></g>
    </Icon>
  }
}