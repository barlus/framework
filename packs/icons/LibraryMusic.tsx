import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class LibraryMusic extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" /></g>
    </Icon>
  }
}