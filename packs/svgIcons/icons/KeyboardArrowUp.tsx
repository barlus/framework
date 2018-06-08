import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class KeyboardArrowUp extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></g>
        </SvgIcon>)
    }
}