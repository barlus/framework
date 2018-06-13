import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class PlaylistPlay extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z" /></g>
    </Icon>
  }
}