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
  domain: process.env.DOMAIN,
  backendOrigin: process.env.BACKEND_ORIGIN,
};
export default null;
