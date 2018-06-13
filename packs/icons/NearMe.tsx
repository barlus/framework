import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class NearMe extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" /></g>
    </Icon>
  }
}