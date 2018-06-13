import * as React     from "@barlus/react";
import {Theme}        from './theme';
import {classes}      from '../utils/classes';
import {Bar}          from "./Bar";
import {BarItem}      from "./BarItem";
import {BarItemProps} from "./BarItem";
import {SliderButton} from "./SliderButton";

export class Slider extends React.PureComponent<SliderProps, {}> {
  render() {
    const {
      className,
      // Colors
      children,
      progress,
      ...otherProps
    } = this.props;
    const childrenCount = React.Children.count(children);
    return <Bar {...otherProps} className={classes(Theme.barSlider, className)}>
      {(progress === undefined || childrenCount)
        ? (children)
        : (<BarItem progress={progress}><SliderButton/></BarItem>)
      }
    </Bar>
  }
}

export interface SliderProps extends BarItemProps {
}