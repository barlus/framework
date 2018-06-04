import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';


export class Columns extends React.PureComponent<ColumnsProps, {}> {
    render(){
        const { children, className, gapless, oneline, ...otherProps } = this.props;
        const classNames = classes(
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

interface ColumnsProps {
    children?: any,
    className?: string,
    gapless?: boolean,
    oneline?: boolean
}

