import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Add extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></g>
    </Icon>
  }
}