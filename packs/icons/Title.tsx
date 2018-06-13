import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Title extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M5 4v3h5.5v12h3V7H19V4z" /></g>
    </Icon>
  }
}