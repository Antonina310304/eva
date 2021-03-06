import './setupEnvs';

export type EnvMode = 'production' | 'development';

const mode = process.env.NODE_ENV as EnvMode;
const isProd = mode === 'production';
const isDev = mode === 'development';

export const envs = {
  mode,
  isDev,
  isProd,
  port: process.env.PORT || 4444,
  backendOrigin: process.env.BACKEND_ORIGIN,
  sentryEnv: process.env.SENTRY_ENVIRONMENT || 'development',
  sentryFrontendDsn: process.env.SENTRY_FRONTEND_DSN,
  sentryBffDsn: process.env.SENTRY_BFF_DSN,
};
export default null;
