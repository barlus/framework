import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class VideoContainer extends React.PureComponent<VideoContainerProps, {}> {
    render() {
        const {
            className,
            // Styles.
            responsive, contain, cover,
            children,
            ...otherProps
        } = this.props;
        return <div {...otherProps} class={
            classes({
                [ Theme.videoResponsive ]: responsive,
                [ Theme.videoResponsive11 ]: responsive == '1:1',
                [ Theme.videoResponsive43 ]: responsive == '4:3',
                [ Theme.imgContain ]: contain,
                [ Theme.imgCover ]: cover,
            }, className)
        }>{children}/></div>
    }
}

export interface VideoContainerProps {
    className?: string,
    contain?:boolean
    cover?:boolean
    responsive?:boolean | "1:1"| "4:3" ;
}