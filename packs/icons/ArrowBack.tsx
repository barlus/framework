import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ArrowBack extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></g>
    </Icon>
  }
}