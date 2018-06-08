import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Navigation extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></g>
        </SvgIcon>)
    }
}