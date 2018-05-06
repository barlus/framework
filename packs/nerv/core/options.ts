import { noop, CompositeComponent, StatelessComponent, VirtualNode } from '../shared/index'

export type optionsHook = (vnode: CompositeComponent | StatelessComponent) => void

export const options = {
    afterMount: noop as optionsHook,
    afterUpdate: noop as optionsHook,
    beforeUnmount: noop as optionsHook,
    roots: [] as VirtualNode[],
    debug: false as boolean
};