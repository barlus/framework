import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class CallReceived extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z" /></g>
        </SvgIcon>)
    }
}