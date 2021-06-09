import path from 'path';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import postcssCustomMedia from 'postcss-custom-media';
import postcssObjectFitImages from 'postcss-object-fit-images';
import { RuleSetRule } from 'webpack';

const postCssLoader: RuleSetRule = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      ident: 'postcss',
      plugins: [
        postcssCustomMedia({
          importFrom: path.resolve(__dirname, '../../client/UI/breakpoints.json'),
        }),
        postcssNested(),
        postcssPresetEnv({
          stage: 1,
          autoprefixer: {
            flexbox: 'no-2009',
          },
        }),
        postcssObjectFitImages(),
      ],
    },
  },
};

export default postCssLoader;
