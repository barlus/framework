import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ClearAll extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z" /></g>
    </Icon>
  }
}