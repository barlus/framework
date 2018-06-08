import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SignalCellular4Bar extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M2 22h20V2z" /></g>
        </SvgIcon>)
    }
}