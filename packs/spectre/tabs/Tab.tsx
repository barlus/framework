import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Tab extends React.PureComponent<TabProps, {}> {
    render() {
        const {
            className,
            // Styles.
            block,
            children,
            ...otherProps
        } = this.props;
        return (<ul {...otherProps} className={classes(Theme.tab,{[Theme.tabBlock]:block},className)}>
            {children}
        </ul>)
    }
}

export interface TabProps {
    className?: string,
    block?:boolean
}