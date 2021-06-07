import { RuleSetRule } from 'webpack';

const cssLoader: RuleSetRule = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[contenthash:base64:5]',
    },
    importLoaders: 1,
  },
};

export default cssLoader;
