import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ExposurePlus1 extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M10 7H8v4H4v2h4v4h2v-4h4v-2h-4V7zm10 11h-2V7.38L15 8.4V6.7L19.7 5h.3v13z" /></g>
    </Icon>
  }
}