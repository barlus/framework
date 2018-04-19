import { Component } from './core/Component';

declare interface ITopAppBarProps extends JSX.HTMLAttributes {
    short?: boolean;
    'short-collapsed'?: boolean;
    onNav?(e: MouseEvent);
}
export class TopAppBar extends Component<ITopAppBarProps> {

    static get Section(){
        return TopAppBarSection;
    }
    static get Icon() {
        return TopAppBarIcon;
    }
    static get Title() {
        return TopAppBarTitle;
    }
    static get Row() {
        return TopAppBarRow;
    }

    constructor() {
        super();
        this.componentName = 'top-app-bar';
        this._mdcProps = [ 'short', 'short-collapsed' ];
        this._onNav = this._onNav.bind(this);
    }
    _onNav(e) {
        if (this.props.onNav) {
            this.props.onNav(e);
        }
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    materialDom(props) {
        return (
            <header ref={this.setControlRef} {...props}>
                {props.children}
            </header>
        );
    }
}

export class TopAppBarRow extends Component<{}> {
    constructor() {
        super();
        this.componentName = 'top-app-bar__row';
    }
}

/**
 * @prop align-end = false
 * @prop align-start = false
 * @prop shrink-to-fit = false
 */
export class TopAppBarSection extends Component<{}> {
    constructor() {
        super();
        this.componentName = 'top-app-bar__section';
        this._mdcProps = [ 'align-start', 'align-end' ];
    }
    materialDom(props) {
        return <section {...props}>{props.children}</section>;
    }
}

/**
 * @prop menu = false
 */
export class TopAppBarIcon extends Component<{navigation?:boolean}> {
    constructor(props) {
        super();
        this.componentName = 'top-app-bar__icon';
    }
    materialDom(props) {
        const className = props.navigation
            ? 'material-icons mdc-top-app-bar__navigation-icon'
            : 'material-icons';
        return (
            <a className={className} {...props}>
                {props.children}
            </a>
        );
    }
}

/**
 * @prop title = "
 */
export class TopAppBarTitle extends Component<{}> {
    constructor() {
        super();
        this.componentName = 'top-app-bar__title';
    }
    materialDom(props) {
        return <span {...props}>{props.children}</span>;
    }
}

