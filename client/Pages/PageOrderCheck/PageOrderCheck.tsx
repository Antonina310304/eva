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
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Корзина</h1>

        <div className={styles.container}>
          <div className={styles.content}>Content</div>

          <div className={styles.wrapperSidebar}>Sidebar</div>
        </div>
      </div>
    </div>
  );
};

export default memo(PageOrderCheck);
