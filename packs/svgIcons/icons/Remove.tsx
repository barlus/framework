import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Remove extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M19 13H5v-2h14v2z" /></g>
        </SvgIcon>)
    }
}