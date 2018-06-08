import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class KeyboardArrowDown extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" /></g>
        </SvgIcon>)
    }
}