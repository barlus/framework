import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SignalCellular3Bar extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path fillOpacity=".3" d="M2 22h20V2z" /><path d="M17 7L2 22h15z" /></g>
        </SvgIcon>)
    }
}