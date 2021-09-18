import { RuleSetRule } from 'webpack';

import { envs } from '../../utils/envs';

const babelNodeLoader: RuleSetRule = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: envs.isDev,
    cacheCompression: false,
    presets: [
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: [
      '@loadable/babel-plugin',
      'babel-plugin-jsx-remove-data-test-id',
      '@babel/plugin-proposal-optional-chaining',
    ],
  },
};

export default babelNodeLoader;
