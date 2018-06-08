import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Pause extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></g>
        </SvgIcon>)
    }
}