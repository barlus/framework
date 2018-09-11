declare global {
  interface SymbolConstructor {
    readonly observable: unique symbol;
  }
  const process: {
    env: {
      NODE_ENV: 'development' | 'production'
    }
  };
}

if (typeof Symbol.observable == 'undefined') {
  Object.defineProperty(Symbol, 'observable', {
    value: Symbol('observable')
  })
}

if (typeof window[ 'process' ] == 'undefined') {
  Object.assign(window, {
    process: {
      env: {
        NODE_ENV: 'development'
      }
    }
  })
}

export {}