import resolveAppPath from './resolveAppPath';

export const paths = {
  context: resolveAppPath('./client'),
  entrances: {
    web: resolveAppPath('./client/web.jsx'),
    node: resolveAppPath('./client/node.jsx'),
  },
  dist: {
    web: resolveAppPath('./dist/web'),
    node: resolveAppPath('./dist/node'),
  },
  envFile: resolveAppPath('.env'),
  static: resolveAppPath('./static'),
  breakpoints: resolveAppPath('./client/UI/breakpoints.json'),
};
export default null;
