import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class LaptopChromebook extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M22 18V3H2v15H0v2h24v-2h-2zm-8 0h-4v-1h4v1zm6-3H4V5h16v10z" /></g>
    </Icon>
  }
}