import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { PageB2bData } from './typings';
import styles from './PageB2b.module.css';

export interface PageB2bProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageB2bData;
}

const PageB2b: FC<PageB2bProps> = (props) => {
  const { className, page, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PageB2b
    </div>
  );
};

export default memo(PageB2b);
