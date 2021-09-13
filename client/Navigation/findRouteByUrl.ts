import { matchPath } from 'react-router-dom';

import routes from './routes';

export default (url: string) => {
  let route = null;

  Object.entries(routes).forEach(([name, params]) => {
    const { regional = true, path, exact = true, ...restParams } = params;
    let match = matchPath(url, { path, exact });

    if (regional && !match) {
      match = matchPath(url, { path: `/:region${path}`, exact });
    }

    if (match && !route) {
      route = { name, regional, match, ...restParams };
    }
  });

  return route;
};
