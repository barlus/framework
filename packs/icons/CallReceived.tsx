import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class CallReceived extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z" /></g>
    </Icon>
  }
}