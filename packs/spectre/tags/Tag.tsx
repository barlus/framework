import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Tag extends React.PureComponent<TagProps, {}> {
    render() {
        const {
            className,
            small,
            children,
            error,
            primary,
            rounded,
            secondary,
            success,
            warning,
            ...otherProps
        } = this.props;
        const Element = small ? 'small' : 'span';

        return (<Element {...otherProps} className={classes(Theme.tag,{
            [Theme.tagError]:error,
            [Theme.tagPrimary]:primary,
            [Theme.tagRounded]:rounded,
            [Theme.tagSecondary]:secondary,
            [Theme.tagSuccess]:success,
            [Theme.tagWarning]:warning,
        },className)}>
            {children}
        </Element>)
    }
}

export interface TagProps {
    className?: string,
    small?:boolean,
    error? :boolean,
    primary? :boolean,
    rounded? :boolean,
    secondary? :boolean,
    success? :boolean,
    warning? :boolean,
}