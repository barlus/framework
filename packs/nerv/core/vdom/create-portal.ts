import { VirtualNode, VType, Portal } from '../../shared/index'

export function createPortal (children: VirtualNode, container: Element): Portal {
  return {
    type: container,
    vtype: VType.Portal,
    children,
    dom: null
  }
}
