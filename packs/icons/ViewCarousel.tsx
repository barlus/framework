import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ViewCarousel extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z" /></g>
    </Icon>
  }
}