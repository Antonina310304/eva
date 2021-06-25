import { HotModuleReplacementPlugin, DefinePlugin, Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

import commonConfig from './common';
import { babelWebLoader, cssModulesLoader, cssLoader, postcssLoader } from '../loaders';
import { envs } from '../../utils/envs';
import { paths } from '../../utils/paths';

const webConfig: Configuration = merge(commonConfig, {
  name: 'web',
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [babelWebLoader],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          envs.isProd
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : {
                loader: 'style-loader',
              },
          cssLoader,
          postcssLoader,
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          envs.isProd
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : {
                loader: 'style-loader',
              },
          cssModulesLoader,
          postcssLoader,
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2|otf)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
    ],
  },
  entry: [
    envs.isDev && 'webpack-hot-middleware/client?name=web&reload=true&quiet=true',
    paths.entrances.web,
  ].filter(Boolean),
  output: {
    path: paths.dist.web,
    pathinfo: false,
    filename: envs.isProd ? `[name].[contenthash].js` : '[name].js',
    chunkFilename: envs.isProd ? `[name].[contenthash].js` : '[name].js',
    publicPath: '/react/assets/',
    libraryTarget: undefined,
    assetModuleFilename: '[hash][ext]',
  },
  optimization: {
    minimize: envs.isProd,
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
    removeAvailableModules: envs.isProd,
    removeEmptyChunks: envs.isProd,
    runtimeChunk: envs.isDev,
  },
  plugins: [
    envs.isDev && new HotModuleReplacementPlugin(),
    envs.isProd &&
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(envs.mode),
      'process.env.BACKEND_ORIGIN': JSON.stringify(envs.backendOrigin),
    }),
    new CleanWebpackPlugin(),
    new LoadablePlugin() as any,
  ].filter(Boolean),
});

export default webConfig;
