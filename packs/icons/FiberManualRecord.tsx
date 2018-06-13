import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FiberManualRecord extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><circle cx="12" cy="12" r="8" /></g>
    </Icon>
  }
}