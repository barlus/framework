import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Publish extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" /></g>
    </Icon>
  }
}