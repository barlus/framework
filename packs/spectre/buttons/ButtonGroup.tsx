import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export interface GroupProps {
    className?: string,
    block?: boolean,
}

export class ButtonGroup extends React.PureComponent<GroupProps, {}> {
    static defaultProps = {
        className: '' as string,
        link: false as boolean,
    };
    render() {
        const { block, children, ...otherProps } = this.props;
        return (
            <div {...otherProps} className={
                classes(Theme.ButtonGroup, {
                    [Theme.block]: block
                })
            }>{children}</div>
        )
    }
}
