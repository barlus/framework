import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';


class Portal extends React.PureComponent<any,any> {
    private el:HTMLElement;
    constructor(props, context?){
        super(props,context);
        this.el = document.createElement('div');
    }


    componentDidMount() {
        document.body.appendChild(this.el);
    }
    componentWillUnmount() {
        document.body.removeChild(this.el);
    }
    render(){
        return React.createPortal(
            this.props.children as any,
            this.el
        );
    }
}

export class Modal extends React.PureComponent<ModalProps, {close:boolean}> {
    static defaultProps = {
        open:true,
    };

    handleOnBackgroundClick = (e)=>{
        this.props.onBackgroundClick && this.props.onBackgroundClick(e);
    };

    render(){
        const {
            className,
            open,
            //sizes
            large,
            small,
            // Styles.
            children,
            ...otherProps
        } = this.props;

        return ( open && <Portal>
            <div {...  otherProps} class={classes(Theme.Modal,Theme.active,{[Theme.small]:small,[Theme.large]:large},className)}>
                <a class={Theme.modalOverlay} onclick={this.handleOnBackgroundClick}/>
                <div class={Theme.modalContainer}>
                    {children}
                </div>
            </div>
        </Portal>)
    }

}

export interface ModalProps {
    className?: string,
    open?:boolean,
    small?:boolean
    large?:boolean
    onBackgroundClick?:Function
}