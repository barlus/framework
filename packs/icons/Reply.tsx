import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Reply extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" /></g>
    </Icon>
  }
}