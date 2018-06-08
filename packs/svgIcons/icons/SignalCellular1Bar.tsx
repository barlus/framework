import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SignalCellular1Bar extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path fillOpacity=".3" d="M2 22h20V2z" /><path d="M12 12L2 22h10z" /></g>
        </SvgIcon>)
    }
}