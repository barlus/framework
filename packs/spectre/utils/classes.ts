export function classes(...args: (number | string | object | (number | string | object)[])[]): string {
  const list = [];
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[ i ];
    if (!arg) {
      continue;
    }
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      list.push(arg);
    } else if (Array.isArray(arg)) {
      list.push(classes.apply(null, arg));
    } else if (argType === 'object') {
      for (let key in arg) {
        if (arg.hasOwnProperty(key) && arg[ key ]) {
          list.push(key);
        }
      }
    }
  }
  return list.join(' ');
}
