import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ViewHeadline extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z" /></g>
    </Icon>
  }
}