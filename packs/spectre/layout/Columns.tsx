import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes as classnames } from '../utils/classes';


export class Columns extends React.PureComponent<RowProps, {}> {
    render(){
        const { children, className, gapless, oneline, ...otherProps } = this.props;
        const classNames = classnames(
            Theme.Columns,
            {
                [Theme.gapless]: gapless,
                [Theme.oneline]: oneline
            },
            className
        );

        return (
            <div className={classNames} {...otherProps}>
                {children}
            </div>
        )
    }
}

interface RowProps {
    children?: any,
    className?: string,
    gapless?: boolean,
    oneline?: boolean
}

