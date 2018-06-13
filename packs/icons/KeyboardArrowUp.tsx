import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class KeyboardArrowUp extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></g>
    </Icon>
  }
}