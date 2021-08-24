import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import { PageOrderCheckData } from './typings';
import styles from './PageOrderCheck.module.css';

export interface PageOrderCheckProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageOrderCheckData;
  meta: MetaData;
}

const PageOrderCheck: FC<PageOrderCheckProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PageOrderCheck
    </div>
  );
};

export default memo(PageOrderCheck);
