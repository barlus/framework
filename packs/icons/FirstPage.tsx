import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FirstPage extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" /></g>
    </Icon>
  }
}