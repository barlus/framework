import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SkipNext extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></g>
    </Icon>
  }
}