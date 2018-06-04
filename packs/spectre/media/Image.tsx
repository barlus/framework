import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Image extends React.PureComponent<ImageProps, {}> {
    render() {
        const {
            className,
            // Styles.
            responsive, contain, cover,
            children,
            ...otherProps
        } = this.props;
        return <img {...otherProps} class={
            classes({
                [ Theme.imgResponsive ]: responsive,
                [ Theme.imgFitContain ]: contain,
                [ Theme.imgFitCover ]: cover,
            }, className)
        }>{children}/></img>
    }
}

export interface ImageProps {
    className?: string,
    src:string
    responsive?:boolean
    contain?:boolean
    cover?:boolean
}