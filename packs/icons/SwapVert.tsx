import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SwapVert extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" /></g>
    </Icon>
  }
}