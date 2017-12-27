'use strict';
export function warner(target, msg, data) {
  if (!target.strict) {
    target.emit('warn', msg, data)
  }
  else if (data instanceof Error) {
    target.emit('error', data)
  } else {
    const er = new Error(msg);
    // @ts-ignore
    er.data = data;
    target.emit('error', er);
  }
}