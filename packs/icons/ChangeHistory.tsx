import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class ChangeHistory extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z" /></g>
    </Icon>
  }
}