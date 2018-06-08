import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Send extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></g>
        </SvgIcon>)
    }
}