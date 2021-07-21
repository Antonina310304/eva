import React from 'react';

export interface RequestState {
  cookie: string;
}

const symbolName = '__DATA_CONTEXT__';
const hasSymbol = typeof Symbol === 'function' && Symbol.for;
const contextSymbol = hasSymbol ? Symbol.for(symbolName) : symbolName;
const initialState: RequestState = { cookie: '' };

export function resetContext(): void {
  Object.defineProperty(React, contextSymbol, {
    value: React.createContext(initialState),
    enumerable: false,
    configurable: true,
    writable: false,
  });
}

export function getContext(): React.Context<RequestState> {
  if (!(React as any)[contextSymbol]) {
    resetContext();
  }

  return (React as any)[contextSymbol];
}

export default getContext();
