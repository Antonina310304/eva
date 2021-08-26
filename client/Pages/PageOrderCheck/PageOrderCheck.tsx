import React, { FC, HTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import { useCart } from '@Stores/Cart';
import { MetaData } from '@Types/Meta';
import { PageOrderCheckData } from './typings';
import WrapperForm from './elems/WrapperForm';
import styles from './PageOrderCheck.module.css';
import ListOfPositions from './elems/ListOfPositions';

export interface PageOrderCheckProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageOrderCheckData;
  meta: MetaData;
}

const PageOrderCheck: FC<PageOrderCheckProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const cart = useCart({ preload: true });

  if (cart.network !== 'success') return null;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Корзина</h1>

        <div className={styles.container}>
          <div className={styles.content}>
            <ListOfPositions />

            <WrapperForm className={styles.wrapperForm} title='Заполните информацию о себе'>
              Content
            </WrapperForm>
          </div>

          <div className={styles.wrapperSidebar}>Sidebar</div>
        </div>
      </div>
    </div>
  );
};

export default memo(PageOrderCheck);
