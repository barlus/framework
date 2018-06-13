import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FastForward extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" /></g>
    </Icon>
  }
}