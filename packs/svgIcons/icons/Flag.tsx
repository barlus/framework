import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class Flag extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" /></g>
        </SvgIcon>)
    }
}