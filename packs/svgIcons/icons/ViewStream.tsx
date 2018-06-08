import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class ViewStream extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z" /></g>
        </SvgIcon>)
    }
}