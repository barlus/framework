import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class PriorityHigh extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><circle cx="12" cy="19" r="2" /><path d="M10 3h4v12h-4z" /></g>
        </SvgIcon>)
    }
}