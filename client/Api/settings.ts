import { MetaData } from '@Types/Meta';

export interface RequestSettings {
  origin: string;
  cookie: string;
}

export type ServicesSettings = MetaData['services'];

export interface Current {
  request?: RequestSettings;
  services?: ServicesSettings;
  region?: string;
}

export interface Store {
  current: Current;
}

const store: Store = { current: null };

export function setRequest(request: RequestSettings): void {
  store.current = {
    ...store.current,
    request,
  };
}

export function getRequest(): RequestSettings {
  return store.current?.request;
}

export function setServices(services: ServicesSettings): void {
  store.current = {
    ...store.current,
    services,
  };
}

export function getServices(): ServicesSettings {
  return store.current?.services;
}

export function setRegion(region: string): void {
  store.current = {
    ...store.current,
    region,
  };
}

export function getRegion(): string {
  return store.current?.region;
}
