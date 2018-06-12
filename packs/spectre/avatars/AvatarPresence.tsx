import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class AvatarPresence extends React.PureComponent<AvatarPresenceProps, {}> {
    render() {
        const {
            className,
            src,
            // Styles.
            online, busy, away,
            children,
            ...otherProps
        } = this.props;
        return <i {...otherProps} className={
            classes(Theme.avatarPresence,{
                [ Theme.busy ]: busy,
                [ Theme.away ]: away,
                [ Theme.online ]: online,
            }, className)
        }/>

    }
}

export interface AvatarPresenceProps {
    [k:string]:any;//todo fix me
    className?: string,
    online?: boolean
    busy?: boolean
    away?: boolean
}