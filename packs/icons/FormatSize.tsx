import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FormatSize extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z" /></g>
    </Icon>
  }
}