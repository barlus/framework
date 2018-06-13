import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Dashboard extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></g>
    </Icon>
  }
}