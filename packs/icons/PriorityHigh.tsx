import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class PriorityHigh extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><circle cx="12" cy="19" r="2" /><path d="M10 3h4v12h-4z" /></g>
    </Icon>
  }
}