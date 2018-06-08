import * as React from "@barlus/react";
import {SvgIcon, SvgIconProps} from "../core/SvgIcon";
export class ChangeHistory extends React.Component<SvgIconProps>{
    render(){
        return ( <SvgIcon {...this.props}>
            <g><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z" /></g>
        </SvgIcon>)
    }
}