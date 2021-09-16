import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import { sliderData } from '@Pages/PageIndex/data';
import MainGallery from './elems/MainGallery';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: Write the types for this
  page: any;
  meta: MetaData;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.section}>
        <MainGallery slides={sliderData} />
      </div>
    </div>
  );
};

export default memo(PageIndex);
