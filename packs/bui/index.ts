import {globals} from '@barlus/runtime/globals';
import {render} from './core/render';
import {createElement,cloneElement} from './core/node';
import {Tag} from './core/component';

export * from "./styling";
export * from "./core/component";
export {render};

declare global {
    namespace React {
        export function createElement<P,S>(node: JSX.ComponentConstructor<P, S> | JSX.FunctionalComponent<P> | string, attributes: JSX.Attributes & P, ...children: JSX.Nodes[]): JSX.Element;
        export function render(node: JSX.Element, parent?: Element, merge?: Element): Node;
    }
}
export const React = globals.React = {
    Component:Tag,
    createElement:createElement,
    cloneElement:cloneElement,
    render:render
};
