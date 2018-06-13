import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class LocalBar extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z" /></g>
    </Icon>
  }
}