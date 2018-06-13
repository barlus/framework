import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SignalWifi0Bar extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path fillOpacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" /></g>
    </Icon>
  }
}