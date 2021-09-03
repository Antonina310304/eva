import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import OrderForm from '@Forms/OrderForm';
import { useOrderForm } from '@Stores/OrderForm';
import { Profile } from '@Types/Profile';
import { PageOrderCheckData } from './typings';
import WrapperForm from './elems/WrapperForm';
import styles from './PageOrderCheck.module.css';
import ListOfPositions from './elems/ListOfPositions';
import Sidebar from './elems/Sidebar';

export interface PageOrderCheckProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageOrderCheckData;
  profile?: Profile;
}

const PageOrderCheck: FC<PageOrderCheckProps> = (props) => {
  const { className, page, profile, ...restProps } = props;
  const orderForm = useOrderForm();

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      {orderForm.count > 0 ? (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Корзина</h1>

          <div className={styles.container}>
            <div className={styles.content}>
              <ListOfPositions />

              <WrapperForm
                className={styles.wrapperForm}
                head={<h2 className={styles.formTitle}>Заполните информацию о себе</h2>}
              >
                <OrderForm profile={profile} />
              </WrapperForm>
            </div>

            <div className={styles.wrapperSidebar}>
              <Sidebar
                className={styles.sidebar}
                delivery={{
                  price: orderForm.selectedDelivery?.sum,
                  description: page.deliveryCostDescription,
                }}
                prepaymentPercent={page.deliveryCostDescription}
                profile={profile}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>Корзина пуста</div>
      )}
    </div>
  );
};

export default memo(PageOrderCheck);
