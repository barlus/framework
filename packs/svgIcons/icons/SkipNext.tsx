import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SkipNext extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></g>
        </SvgIcon>)
    }
}