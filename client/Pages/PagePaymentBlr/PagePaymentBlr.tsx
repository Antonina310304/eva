import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import styles from './PagePaymentBlr.module.css';

export interface PagePaymentBlrProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PagePaymentBlr: FC<PagePaymentBlrProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PagePaymentBlr
    </div>
  );
};

export default memo(PagePaymentBlr);
