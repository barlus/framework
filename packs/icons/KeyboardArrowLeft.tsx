import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class KeyboardArrowLeft extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" /></g>
    </Icon>
  }
}