import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import postcssCustomMedia from 'postcss-custom-media';
import postcssObjectFitImages from 'postcss-object-fit-images';
import { RuleSetRule } from 'webpack';

import { paths } from '../../utils/paths';

const postCssLoader: RuleSetRule = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      ident: 'postcss',
      plugins: [
        postcssCustomMedia({
          importFrom: paths.breakpoints,
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
