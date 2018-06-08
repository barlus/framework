import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class FastForward extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" /></g>
        </SvgIcon>)
    }
}