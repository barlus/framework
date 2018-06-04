import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {Image} from "../media/Image";

export class CardImage extends React.PureComponent<CardImageProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div class={classes(Theme.cardImage)}>
                <Image responsive {...otherProps} className={classes(className)}/>
        </div>)
    }
}

export interface CardImageProps {
    className?: string,
    src: string,
}