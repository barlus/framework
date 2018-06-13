import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class KeyboardBackspace extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" /></g>
    </Icon>
  }
}