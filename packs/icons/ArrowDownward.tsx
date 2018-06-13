import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ArrowDownward extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" /></g>
    </Icon>
  }
}