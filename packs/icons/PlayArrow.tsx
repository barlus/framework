import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class PlayArrow extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M8 5v14l11-7z" /></g>
    </Icon>
  }
}