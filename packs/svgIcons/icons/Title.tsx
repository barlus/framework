import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Title extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M5 4v3h5.5v12h3V7H19V4z" /></g>
        </SvgIcon>)
    }
}