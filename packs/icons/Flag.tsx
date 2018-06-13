import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class Flag extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" /></g>
    </Icon>
  }
}