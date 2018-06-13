import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FlashOff extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M3.27 3L2 4.27l5 5V13h3v9l3.58-6.14L17.73 20 19 18.73 3.27 3zM17 10h-4l4-8H7v2.18l8.46 8.46L17 10z" /></g>
    </Icon>
  }
}