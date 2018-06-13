import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class BorderAll extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z" /></g>
    </Icon>
  }
}