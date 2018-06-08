import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class ViewArray extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z" /></g>
        </SvgIcon>)
    }
}