declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    BACKEND_ORIGIN: string;
  }
}
