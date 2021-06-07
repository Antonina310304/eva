import { RuleSetRule } from 'webpack';
import envs from '../envs';

const babelWebLoader: RuleSetRule = {
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
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          modules: 'umd',
        },
      ],
    ],
    plugins: [
      'babel-plugin-jsx-remove-data-test-id',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-runtime',
      '@loadable/babel-plugin',
    ].filter(Boolean),
  },
};

export default babelWebLoader;
