import * as React from "@barlus/react";

import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Container extends React.PureComponent<{}, {}> {
    render() {
        const { children, className, ...otherProps } = this.props;
        const classNames = classes(Theme.container, className);
        return (
            <div className={classNames} {...otherProps}>
                {children}
            </div>
        )
    }
}

