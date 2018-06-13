import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SignalCellularConnectedNoInternet0Bar extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path fillOpacity=".3" d="M22 8V2L2 22h16V8z" /><path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z" /></g>
    </Icon>
  }
}