import * as React from "@barlus/nerv";

import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Container extends React.PureComponent<{}, {}> {
    render() {
        const { children, className, ...otherProps } = this.props;
        const classNames = classes(Theme.Container, className);
        return (
            <div className={classNames} {...otherProps}>
                {children}
            </div>
        )
    }
}

