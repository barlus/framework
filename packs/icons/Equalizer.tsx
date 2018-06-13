import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Equalizer extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z" /></g>
    </Icon>
  }
}