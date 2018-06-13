import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class NavigateBefore extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></g>
    </Icon>
  }
}