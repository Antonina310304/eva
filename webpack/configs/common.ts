import path from 'path';
import { Configuration } from 'webpack';

import paths from '../paths';
import envs from '../envs';

const commonConfig: Configuration = {
  mode: envs.mode,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      static: paths.static,
      '@App': path.resolve(paths.context, './App'),
      '@Components': path.resolve(paths.context, './Components'),
      '@Containers': path.resolve(paths.context, './Containers'),
      '@Contexts': path.resolve(paths.context, './Contexts'),
      '@Hooks': path.resolve(paths.context, './Hooks'),
      '@Modals': path.resolve(paths.context, './Modals'),
      '@Pages': path.resolve(paths.context, './Pages'),
      '@Templates': path.resolve(paths.context, './Templates'),
      '@Types': path.resolve(paths.context, './Types'),
      '@Utils': path.resolve(paths.context, './Utils'),
    },
  },
  cache: envs.isDev
    ? {
        type: 'filesystem',
      }
    : false,
};

export default commonConfig;
