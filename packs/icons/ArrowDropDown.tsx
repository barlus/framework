import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ArrowDropDown extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M7 10l5 5 5-5z" /></g>
    </Icon>
  }
}