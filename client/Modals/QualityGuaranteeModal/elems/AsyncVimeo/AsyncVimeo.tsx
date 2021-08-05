import React, { FC, memo } from 'react';
import loadable from '@loadable/component';

import { VimeoProps } from '@u-wave/react-vimeo';
import styles from './AsyncVimeo.module.css';

const LoadableVimeo = loadable.lib(() => import('@u-wave/react-vimeo'));

const AsyncVimeo: FC<VimeoProps> = (props) => {
  return (
    <LoadableVimeo>
      {({ default: Vimeo }) => <Vimeo {...props} className={styles.asyncVimeo} responsive />}
    </LoadableVimeo>
  );
};

export default memo(AsyncVimeo);
