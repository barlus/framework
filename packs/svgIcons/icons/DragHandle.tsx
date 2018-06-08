import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class DragHandle extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" /></g>
        </SvgIcon>)
    }
}