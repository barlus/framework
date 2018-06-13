import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ExpandMore extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></g>
    </Icon>
  }
}