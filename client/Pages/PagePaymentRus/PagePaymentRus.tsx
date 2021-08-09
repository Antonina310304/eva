import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import styles from './PagePaymentRus.module.css';

export interface PagePaymentRusProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PagePaymentRus: FC<PagePaymentRusProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PagePaymentRus
    </div>
  );
};

export default memo(PagePaymentRus);
