import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Info extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></g>
    </Icon>
  }
}