import * as React  from "@barlus/react";
import {Icon}      from "./core/Icon";
import {IconProps} from "./core/Icon";
  
export class FileUpload extends React.PureComponent<IconProps> {
  render() {
    return <Icon {...this.props}>
      <g><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></g>
    </Icon>
  }
}