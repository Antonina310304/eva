import path from 'path';
import resolveAppPath from './resolveAppPath';

const dist = {
  web: resolveAppPath('./dist/web'),
  node: resolveAppPath('./dist/node'),
};

export const paths = {
  dist,
  stats: {
    node: path.resolve(dist.node, 'loadable-stats.json'),
    web: path.resolve(dist.web, 'loadable-stats.json'),
  },
  context: resolveAppPath('./client'),
  entrances: {
    web: resolveAppPath('./client/web.jsx'),
    node: resolveAppPath('./client/node.jsx'),
  },
  envFile: resolveAppPath('.env'),
  static: resolveAppPath('./static'),
  breakpoints: resolveAppPath('./client/UI/breakpoints.json'),
};
export default null;
