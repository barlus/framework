import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class FiberManualRecord extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><circle cx="12" cy="12" r="8" /></g>
        </SvgIcon>)
    }
}