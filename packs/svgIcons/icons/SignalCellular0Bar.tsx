import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SignalCellular0Bar extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path fillOpacity=".3" d="M2 22h20V2z" /></g>
        </SvgIcon>)
    }
}