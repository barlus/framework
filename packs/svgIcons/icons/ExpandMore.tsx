import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class ExpandMore extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></g>
        </SvgIcon>)
    }
}