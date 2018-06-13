import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SpaceBar extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M18 9v4H6V9H4v6h16V9z" /></g>
    </Icon>
  }
}