import * as React from "@barlus/react";
import {Theme}   from './theme';
import {classes} from '../utils/classes';

export class Column extends React.PureComponent<ColumnProps, {}> {
  private static getColumnClasses(componentProps) {
    const { all, offset, hide, show } = componentProps;
    const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const classesNames = [];
    const colPrefix = 'col';
    if (all) {
      classesNames.push(`${colPrefix}-${all}`)
    } else {
      classesNames.push(
        colSizes.reduce((sizes, size) => {
          if (!componentProps[size]) {
            return sizes
          }
          return classes(sizes, `${colPrefix}-${size}-${componentProps[size]}`)
        }, '')
      )
    }
    if (offset) {
      classesNames.push(`${colPrefix}-${offset}-auto`)
    }
    if (hide) {
      classesNames.push(classes(hide.map(size => `hide-${size}`)))
    }
    if (show) {
      classesNames.push(classes(show.map(size => `show-${size}`)))
    }
    return classesNames;
  };

  render() {
    const { children, className, ...otherProps } = this.props;
    return <div className={classes(
      Theme.column,
      Column.getColumnClasses(otherProps),
      className
    )}>{children}</div>
  }
}

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  all?: number,
  offset?: number,
  hide?: string[],
  show?: string[]
}

