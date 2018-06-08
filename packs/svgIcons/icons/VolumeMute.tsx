import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class VolumeMute extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M7 9v6h4l5 5V4l-5 5H7z" /></g>
        </SvgIcon>)
    }
}