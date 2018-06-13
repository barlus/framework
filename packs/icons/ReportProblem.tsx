import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ReportProblem extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></g>
    </Icon>
  }
}