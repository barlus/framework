import {bindActionCreators}                         from '../../core/index'
import {wrapMapToPropsConstant, wrapMapToPropsFunc} from './wrapMapToProps'


export function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return (typeof mapDispatchToProps === 'function')
    ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps')
    : undefined
}

export function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return (!mapDispatchToProps)
    ? wrapMapToPropsConstant(dispatch => ({ dispatch }))
    : undefined
}

export function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return (mapDispatchToProps && typeof mapDispatchToProps === 'object')
    ? wrapMapToPropsConstant(dispatch => bindActionCreators(mapDispatchToProps, dispatch))
    : undefined
}

export const defaultMapDispatchToPropsFactories = [
  whenMapDispatchToPropsIsFunction,
  whenMapDispatchToPropsIsMissing,
  whenMapDispatchToPropsIsObject
];
