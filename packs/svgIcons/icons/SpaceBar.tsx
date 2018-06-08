import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class SpaceBar extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M18 9v4H6V9H4v6h16V9z" /></g>
        </SvgIcon>)
    }
}