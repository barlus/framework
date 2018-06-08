import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class FileUpload extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></g>
        </SvgIcon>)
    }
}