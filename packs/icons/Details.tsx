import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Details extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z" /></g>
    </Icon>
  }
}