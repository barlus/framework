import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class VerticalAlignBottom extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z" /></g>
        </SvgIcon>)
    }
}