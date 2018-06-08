import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class TrendingFlat extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M22 12l-4-4v3H3v2h15v3z" /></g>
        </SvgIcon>)
    }
}