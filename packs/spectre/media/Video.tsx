import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Video extends React.PureComponent<VideoProps, {}> {
    render() {
        const {
            className,
            // Styles.
            responsive, contain, cover,
            children,
            ...otherProps
        } = this.props;
        return <video {...otherProps} className={
            classes({
                [ Theme.videoResponsive ]: responsive,
                [ Theme.videoResponsive11 ]: responsive == '1:1',
                [ Theme.videoResponsive43 ]: responsive == '4:3',
                [ Theme.imgFitContain ]: contain,
                [ Theme.imgFitCover ]: cover,
            }, className)
        }>{children}/></video>
    }
}

export interface VideoProps {
    className?: string,
    src:string
    contain?:boolean
    cover?:boolean
    responsive?:boolean | "1:1"| "4:3" ;
}