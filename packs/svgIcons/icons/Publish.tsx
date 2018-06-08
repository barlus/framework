import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Publish extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" /></g>
        </SvgIcon>)
    }
}