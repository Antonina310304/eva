import resolveAppPath from './helpers/resolveAppPath';

export default {
  dist: {
    web: resolveAppPath('./dist/web'),
    node: resolveAppPath('./dist/node'),
  },
  envFile: resolveAppPath('.env'),
};
