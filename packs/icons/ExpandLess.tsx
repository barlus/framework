import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ExpandLess extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" /></g>
    </Icon>
  }
}