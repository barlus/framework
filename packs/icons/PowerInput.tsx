import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class PowerInput extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M2 9v2h19V9H2zm0 6h5v-2H2v2zm7 0h5v-2H9v2zm7 0h5v-2h-5v2z" /></g>
    </Icon>
  }
}