import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SkipPrevious extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></g>
        </SvgIcon>)
    }
}