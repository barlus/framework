import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Home extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></g>
        </SvgIcon>)
    }
}