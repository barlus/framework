import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class CallMade extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" /></g>
    </Icon>
  }
}