import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class ChevronRight extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></g>
        </SvgIcon>)
    }
}