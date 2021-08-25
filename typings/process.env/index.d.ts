declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    BACKEND_ORIGIN: string;
    SENTRY_ENVIRONMENT: 'production' | 'development' | 'staging';
    SENTRY_FRONTEND_DSN: string;
    SENTRY_BFF_DSN: string;
  }
}
