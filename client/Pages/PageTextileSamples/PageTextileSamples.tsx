import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import { PageTextileSamplesData } from './typings';
import styles from './PageTextileSamples.module.css';

export interface PageTextileSamplesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageTextileSamplesData;
  meta: MetaData;
}

const PageTextileSamples: FC<PageTextileSamplesProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PageTextileSamples
    </div>
  );
};

export default memo(PageTextileSamples);
