import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Functions extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z" /></g>
        </SvgIcon>)
    }
}