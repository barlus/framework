import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class BubbleChart extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><circle cx="7.2" cy="14.4" r="3.2" /><circle cx="14.8" cy="18" r="2" /><circle cx="15.2" cy="8.8" r="4.8" /></g>
    </Icon>
  }
}