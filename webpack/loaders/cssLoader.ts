import { RuleSetRule } from 'webpack';

const cssLoader: RuleSetRule = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
  },
};

export default cssLoader;
