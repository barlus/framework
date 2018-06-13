import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class KeyboardArrowRight extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /></g>
    </Icon>
  }
}