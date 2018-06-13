import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ArrowDropUp extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M7 14l5-5 5 5z" /></g>
    </Icon>
  }
}