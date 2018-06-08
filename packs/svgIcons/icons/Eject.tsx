import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Eject extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z" /></g>
        </SvgIcon>)
    }
}