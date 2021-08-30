import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import { PageOrderStatusData } from './typings';
import styles from './PageOrderStatus.module.css';

export interface PageOrderStatusProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: типизируй меня полностью
  page: PageOrderStatusData;
  meta: MetaData;
}

const PageOrderStatus: FC<PageOrderStatusProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PageOrderStatus
    </div>
  );
};

export default memo(PageOrderStatus);
