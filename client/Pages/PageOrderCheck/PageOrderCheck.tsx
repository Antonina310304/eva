import React, { FC, HTMLAttributes, memo, useRef, useEffect, useState, useCallback } from 'react';
import cn from 'classnames';

import OrderForm from '@Forms/OrderForm';
import { useOrderForm } from '@Stores/OrderForm';
import useMedias from '@Hooks/useMedias';
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
  const { isMobileM } = useMedias();
  const [sidebarStyles, setSidebarStyles] = useState(null);
  const orderForm = useOrderForm();
  const refContent = useRef<HTMLDivElement>(null);
  const refSidebar = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!refContent.current || !refSidebar.current) return;

    const rectContent = refContent.current.getBoundingClientRect();
    const rectSidebar = refSidebar.current.getBoundingClientRect();

    const boxContentBottom = Math.round(rectContent.bottom);
    const boxContentTop = Math.round(rectContent.top);
    const boxInfoBottom = Math.round(rectSidebar.bottom);
    const boxInfoTop = Math.round(rectSidebar.top);

    if (boxContentBottom <= boxInfoBottom && boxInfoTop <= 0) {
      setSidebarStyles({
        position: 'absolute',
        bottom: 0,
      });
      return;
    }

    if (boxContentTop <= 0) {
      setSidebarStyles({
        position: 'fixed',
        top: 0,
        left: rectSidebar.left,
      });
    } else {
      setSidebarStyles(null);
    }
  }, []);

  // Плавающий блок информации в сайдбаре
  useEffect(() => {
    function cleanup() {
      setSidebarStyles(null);
      window.removeEventListener('scroll', handleScroll);
    }

    if (isMobileM) return cleanup;

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return cleanup;
  }, [handleScroll, isMobileM]);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      {orderForm.count > 0 ? (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Корзина</h1>

          <div className={styles.container}>
            <div className={styles.content} ref={refContent}>
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
                ref={refSidebar}
                style={sidebarStyles}
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
