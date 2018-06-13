import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Repeat extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></g>
    </Icon>
  }
}