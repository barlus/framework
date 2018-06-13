import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ViewStream extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z" /></g>
    </Icon>
  }
}