import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class CallMade extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" /></g>
        </SvgIcon>)
    }
}