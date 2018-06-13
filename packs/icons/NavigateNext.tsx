import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class NavigateNext extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></g>
    </Icon>
  }
}