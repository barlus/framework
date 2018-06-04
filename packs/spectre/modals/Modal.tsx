import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Modal extends React.PureComponent<ModalProps, {}> {
    render() {
        const {
            className,
            label,
            //sizes
            large,
            small,
            // Styles.
            children,
            active,
            ...otherProps
        } = this.props;

        //todo rewrite the modal
        return (<div {...otherProps} class={classes(Theme.modal,{[Theme.active]:active,[Theme.modalSm]:small,[Theme.modalLg]:large},className)}>
            <a class={Theme.modalOverlay} data-label={label}/>
            <div class={Theme.modalContainer}>
                {children}
            </div>
        </div>)
    }
}

export interface ModalProps {
    className?: string,
    label?:string,
    active?:boolean
    small?:boolean
    large?:boolean
}