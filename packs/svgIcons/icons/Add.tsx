import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Add extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></g>
        </SvgIcon>)
    }
}