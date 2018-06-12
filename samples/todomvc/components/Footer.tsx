import * as React from '@barlus/react'

import {FilterLink}  from './FilterLink'
import {Show} from '../state/State'


const FILTER_TITLES = {
  [ Show.ALL ]: 'All',
  [ Show.ACTIVE ]: 'Active',
  [ Show.COMPLETED ]: 'Completed'
};

export class Footer extends React.Component<FooterProps> {
  render() {
    const { activeCount, completedCount, onClearCompleted } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';
    return <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map((filter:Show) =>
          <li key={filter}>
            <FilterLink filter={filter}>
              {FILTER_TITLES[ filter ]}
            </FilterLink>
          </li>
        )}
      </ul>
      {!!completedCount && <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>}
    </footer>
  }
}

interface FooterProps {
  children?: never;
  activeCount?: number;
  completedCount?: number;
  onClearCompleted?();
}
