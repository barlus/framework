import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class ExpandLess extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" /></g>
        </SvgIcon>)
    }
}