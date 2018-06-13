import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Home extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></g>
    </Icon>
  }
}