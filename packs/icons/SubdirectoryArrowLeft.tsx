import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class SubdirectoryArrowLeft extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z" /></g>
    </Icon>
  }
}