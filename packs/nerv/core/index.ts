import { Component } from './component';
import { PureComponent } from './pure-component';
import { render } from './render';
import { createElement } from './create-element';
import { cloneElement } from './clone-element';
import { nextTick } from '../utils/index';
import { createPortal } from './vdom/create-portal';
import { hydrate } from './hydrate';
import { Children } from './children';
import { options } from './options';
import { version } from './version';
import {
    unmountComponentAtNode,
    findDOMNode,
    unstable_renderSubtreeIntoContainer,
    createFactory,
    unstable_batchedUpdates,
    isValidElement
} from './dom'

export {
    Children,
    Component,
    PureComponent,
    createElement,
    cloneElement,
    render,
    nextTick,
    options,
    findDOMNode,
    isValidElement,
    unmountComponentAtNode,
    createPortal,
    unstable_renderSubtreeIntoContainer,
    hydrate,
    createFactory,
    unstable_batchedUpdates,
    version
}

export default {
    Children,
    Component,
    PureComponent,
    createElement,
    cloneElement,
    createPortal,
    createFactory,
    render,
    nextTick,
    options,
    findDOMNode,
    isValidElement,
    unmountComponentAtNode,
    unstable_renderSubtreeIntoContainer,
    hydrate,
    unstable_batchedUpdates,
    version
}
