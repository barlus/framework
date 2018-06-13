import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FormatStrikethrough extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" /></g>
    </Icon>
  }
}