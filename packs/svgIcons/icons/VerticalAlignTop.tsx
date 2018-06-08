import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class VerticalAlignTop extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z" /></g>
        </SvgIcon>)
    }
}