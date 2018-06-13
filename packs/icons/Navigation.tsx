import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Navigation extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></g>
    </Icon>
  }
}