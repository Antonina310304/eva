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
      colors: path.resolve(paths.context, './UI/colors.module.css'),
      containers: path.resolve(paths.context, './UI/containers.module.css'),
      fonts: path.resolve(paths.context, './UI/fonts.module.css'),
      shadows: path.resolve(paths.context, './UI/shadows.module.css'),
      sizes: path.resolve(paths.context, './UI/sizes.module.css'),
      spaces: path.resolve(paths.context, './UI/spaces.module.css'),
      '@Api': path.resolve(paths.context, './Api'),
      '@App': path.resolve(paths.context, './App'),
      '@Components': path.resolve(paths.context, './Components'),
      '@Contexts': path.resolve(paths.context, './Contexts'),
      '@Hooks': path.resolve(paths.context, './Hooks'),
      '@Modals': path.resolve(paths.context, './Modals'),
      '@Pages': path.resolve(paths.context, './Pages'),
      '@Templates': path.resolve(paths.context, './Templates'),
      '@Types': path.resolve(paths.context, './Types'),
      '@UI': path.resolve(paths.context, './UI'),
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
