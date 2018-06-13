import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Send extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></g>
    </Icon>
  }
}