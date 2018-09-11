import {StringType} from '../types';
import {filter}     from '../utils/index'
import {px}         from "./units";


const delimited = (delimiter: string) => {
  return function () {
    return filter(arguments, s => s || s === 0)
      .map(s => typeof s === 'number' ? px(s) : s.toString())
      .join(delimiter);
  }
};

export const list = delimited(' ') as (...parameters: (undefined | number | string | StringType<string>)[]) => string;
export const join = delimited(',') as (...items: (undefined | number | string | StringType<string>)[]) => string;
