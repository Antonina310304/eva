import React from 'react';

const contextSymbol =
  typeof Symbol === 'function' && Symbol.for ? Symbol.for('__DATA_CONTEXT__') : '__DATA_CONTEXT__';

export function resetDataContext(): void {
  Object.defineProperty(React, contextSymbol, {
    value: React.createContext({
      body: null,
      update: () => {},
    }),
    enumerable: false,
    configurable: true,
    writable: false,
  });
}

export function getDataContext(): React.Context<any> {
  if (!React[contextSymbol]) {
    resetDataContext();
  }

  return React[contextSymbol];
}
