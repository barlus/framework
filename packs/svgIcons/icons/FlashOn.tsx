import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class FlashOn extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M7 2v11h3v9l7-12h-4l4-8z" /></g>
        </SvgIcon>)
    }
}