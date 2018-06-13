import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FastRewind extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" /></g>
    </Icon>
  }
}