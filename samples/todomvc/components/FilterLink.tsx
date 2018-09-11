import * as React  from '@barlus/react'
import {connected} from '@barlus/redux/index';
import {Actions}   from '../actions/index';
import {Show}      from '../state/State';
//import {State}     from '../state/State';
import {classes}   from '../utils/classes'


@connected
export class FilterLink extends React.Component<LinkProps> {

  @connected
  private get actions() {
    return connected.actions((dispatch, ownProps: LinkProps) => {
      return {
        setFilter() {
          dispatch(Actions.setVisibilityFilter(ownProps.filter))
        }
      }
    });
  }

  @connected
  private get store() {
    return connected.state((state, ownProps: LinkProps) => {
      return {
        active: ownProps.filter === state.visibilityFilter
      }
    })
  }

  render() {
    // const a: boolean = this.store.active;
    // const f: Function = this.actions.setFilter;
    const { active } = this.store;
    const { setFilter } = this.actions;
    const { children } = this.props;
    return <a
      className={classes({ selected: active })}
      style={{ cursor: 'pointer' }}
      onClick={() => setFilter()}
    >{children}</a>
  }
}

interface LinkProps {
  filter: Show
}




