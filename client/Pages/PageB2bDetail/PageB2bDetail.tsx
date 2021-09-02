import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { PageB2bDetailData } from './typings';
import styles from './PageB2bDetail.module.css';

export interface PageB2bDetailProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: типизируй меня полностью
  page: PageB2bDetailData;
}

const PageB2bDetail: FC<PageB2bDetailProps> = (props) => {
  const { className, page, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PageB2bDetailData
    </div>
  );
};

export default memo(PageB2bDetail);
