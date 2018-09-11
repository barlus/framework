import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class DropdownToggle extends React.PureComponent<DropdownToggleProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    const wrapped = React.Children.map(children, (child: React.ReactElement<any>) => {
      const clazz = classes(Theme.dropdownToggle, child.props.className, className);
      const props = { ...{ className: clazz }, ...{ ...otherProps } };
      return React.cloneElement(child, props)
    });
    return (wrapped)
  }
}

export interface DropdownToggleProps {
  className?: string,
}