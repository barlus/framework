import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class DragHandle extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" /></g>
    </Icon>
  }
}