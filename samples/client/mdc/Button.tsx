import {React} from '@barlus/bui';
import {Component} from './core/Component';
import {Icon} from './Icon';
import {Theme} from './utils/Theme';

declare interface IButtonProps {
    dense?: boolean;
    raised?: boolean;
    disabled?: boolean;
    unelevated?: boolean;
    stroked?: boolean;
    primary?: boolean;
    secondary?: boolean;
}

/**
 *  @prop dense = false
 *  @prop raised = false
 *  @prop compact = false
 *  @prop disabled = false
 *  @prop unelevated = false
 *  @prop stroked = false
 */
export class Button extends Component<IButtonProps> {
    static get Icon() {
        return ButtonIcon;
    }
    protected componentName = 'button';
    protected themeProps = ['primary', 'secondary'];
    protected _mdcProps = ['dense', 'raised', 'unelevated', 'stroked'];
    constructor() {
        super();
        this.componentName = 'button';
        this._mdcProps = ['dense', 'raised', 'unelevated', 'stroked'];
        this.themeProps = ['primary', 'secondary'];
    }

    componentDidMount() {
        super.attachRipple();
    }

    materialDom(props) {
        const ButtonElement = props.href ? 'a' : 'button';
        let className = '';
        this.themeProps.forEach(themeProp => {
            if (themeProp in props && props[themeProp] !== false)
                className += Theme.generateThemeClass(themeProp) + ' ';
        });

        return (
            <ButtonElement ref={this.setControlRef} {...props} className={className}>
                {this.props.children}
            </ButtonElement>
        );
    }
}

class ButtonIcon extends Icon {
    constructor() {
        super();
        this.componentName = 'button__icon';
    }
}
