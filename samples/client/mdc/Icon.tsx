import {Component} from './core/Component';

/**
 * @prop disabled = false
 */
export class Icon extends Component {
  constructor() {
    super();
    this.componentName = 'icon';
  }
  materialDom(props) {
    let classes = ['material-icons'];
    // CardActionIcon sends className
    props.className && classes.push(props.className);
    return (
      <i {...props} className={classes.join(' ')}>
        {props.children}
      </i>
    );
  }
}
