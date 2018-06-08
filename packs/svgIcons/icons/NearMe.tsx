import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class NearMe extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" /></g>
        </SvgIcon>)
    }
}