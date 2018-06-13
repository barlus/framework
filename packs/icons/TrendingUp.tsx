import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class TrendingUp extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></g>
    </Icon>
  }
}