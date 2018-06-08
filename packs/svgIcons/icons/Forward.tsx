import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Forward extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M12 8V4l8 8-8 8v-4H4V8z" /></g>
        </SvgIcon>)
    }
}