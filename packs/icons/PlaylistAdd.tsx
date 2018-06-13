import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class PlaylistAdd extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" /></g>
    </Icon>
  }
}