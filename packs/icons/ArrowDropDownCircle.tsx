import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ArrowDropDownCircle extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z" /></g>
    </Icon>
  }
}