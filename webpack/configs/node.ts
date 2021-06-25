import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import LoadablePlugin from '@loadable/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import commonConfig from './common';
import { babelNodeLoader, cssModulesLoader, postcssLoader } from '../loaders';
import { paths } from '../../utils/paths';

const nodeConfig: Configuration = merge(commonConfig, {
  name: 'node',
  target: 'node',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [babelNodeLoader],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: 'null-loader',
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          cssModulesLoader,
          postcssLoader,
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2|otf)$/,
        exclude: /node_modules/,
        use: 'null-loader',
      },
    ],
  },
  entry: paths.entrances.node,
  output: {
    path: paths.dist.node,
    pathinfo: false,
    filename: '[name].js',
    publicPath: '/dist/node/',
    libraryTarget: 'commonjs2',
    assetModuleFilename: '[hash][ext]',
  },
  externals: ['@loadable/component', nodeExternals()],
  plugins: [new CleanWebpackPlugin(), new LoadablePlugin() as any, new MiniCssExtractPlugin()],
});

export default nodeConfig;
