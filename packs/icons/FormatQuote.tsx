import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FormatQuote extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" /></g>
    </Icon>
  }
}