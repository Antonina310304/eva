export type SerializedEnvs = Record<string, string>;

export type EnvMode = 'production' | 'development';

export interface Envs {
  mode: EnvMode;
  isProd: boolean;
  isDev: boolean;
}

const mode = process.env.NODE_ENV;
const isProd = mode === 'production';
const isDev = mode === 'development';

const envs: Envs = {
  mode,
  isProd,
  isDev,
};

export default envs;
