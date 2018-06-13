import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SignalCellularConnectedNoInternet2Bar extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path fillOpacity=".3" d="M22 8V2L2 22h16V8z" /><path d="M14 22V10L2 22h12zm6-12v8h2v-8h-2zm0 12h2v-2h-2v2z" /></g>
    </Icon>
  }
}