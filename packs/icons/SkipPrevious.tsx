import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SkipPrevious extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></g>
    </Icon>
  }
}