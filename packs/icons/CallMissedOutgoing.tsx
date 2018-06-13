import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class CallMissedOutgoing extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M3 8.41l9 9 7-7V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41z" /></g>
    </Icon>
  }
}