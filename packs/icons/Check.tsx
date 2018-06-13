import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Check extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></g>
    </Icon>
  }
}