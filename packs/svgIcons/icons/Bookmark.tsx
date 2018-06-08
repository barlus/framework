import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Bookmark extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></g>
        </SvgIcon>)
    }
}