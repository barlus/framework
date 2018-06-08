import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class ShortText extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M4 9h16v2H4zm0 4h10v2H4z" /></g>
        </SvgIcon>)
    }
}