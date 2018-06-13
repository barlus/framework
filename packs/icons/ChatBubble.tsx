import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ChatBubble extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></g>
    </Icon>
  }
}