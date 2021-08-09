import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import styles from './PageWarranty.module.css';

export interface PageWarrantyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PageWarranty: FC<PageWarrantyProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PageWarranty
    </div>
  );
};

export default memo(PageWarranty);
