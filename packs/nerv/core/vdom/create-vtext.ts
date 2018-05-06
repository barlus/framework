import { VType, VText } from '../../shared/index'

export function createVText (text: string | number): VText {
  return {
    text,
    vtype: VType.Text,
    dom: null
  }
}
