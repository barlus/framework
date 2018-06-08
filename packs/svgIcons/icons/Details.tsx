import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Details extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z" /></g>
        </SvgIcon>)
    }
}