import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class TrendingFlat extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M22 12l-4-4v3H3v2h15v3z" /></g>
    </Icon>
  }
}