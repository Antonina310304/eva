export interface Current {
  origin: string;
  cookie: string;
}

export interface Store {
  current: Current;
}

const store: Store = { current: null };

export function setRequest(value: Partial<Current>): void {
  store.current = {
    ...store.current,
    ...value,
  };
}

export function getRequest(): Current {
  return store.current;
}
