import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FormatItalic extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" /></g>
    </Icon>
  }
}