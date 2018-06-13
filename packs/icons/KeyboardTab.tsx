import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class KeyboardTab extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M11.59 7.41L15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z" /></g>
    </Icon>
  }
}