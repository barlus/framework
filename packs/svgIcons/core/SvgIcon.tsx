import * as React from "@barlus/react";
import { Theme } from './theme';

export class SvgIcon extends React.PureComponent<SvgIconProps, {}> {
    static defaultProps = {
        viewBox: '0 0 24 24',
    };

    render() {
        const {
            className,
            children,
            titleAccess,
            nativeColor,
            viewBox,
            ...otherProps
        } = this.props;
        return (
            <svg
                className={`${Theme.svgIcon} ${className|| ""}`}
                focusable="false"
                viewBox={viewBox}
                color={nativeColor}
                aria-hidden={titleAccess ? 'false' : 'true'}
                {...otherProps}
            >
                {titleAccess ? <title>{titleAccess}</title> : null}
                {children}
            </svg>
        )
    }
}

export interface SvgIconProps {
    className?: string,
    titleAccess?:string,
    nativeColor?:string,
    viewBox?:string,
}