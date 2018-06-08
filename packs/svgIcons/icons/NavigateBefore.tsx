import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class NavigateBefore extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></g>
        </SvgIcon>)
    }
}