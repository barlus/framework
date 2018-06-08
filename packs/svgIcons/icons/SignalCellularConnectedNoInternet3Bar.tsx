import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SignalCellularConnectedNoInternet3Bar extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path fillOpacity=".3" d="M22 8V2L2 22h16V8z" /><path d="M17 22V7L2 22h15zm3-12v8h2v-8h-2zm0 12h2v-2h-2v2z" /></g>
        </SvgIcon>)
    }
}