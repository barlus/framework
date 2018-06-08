import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SignalCellularNull extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z" /></g>
        </SvgIcon>)
    }
}