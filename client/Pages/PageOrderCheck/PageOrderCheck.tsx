import { FC, HTMLAttributes, memo, useRef, useEffect, useState, useCallback } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';

import Button from '@UI/Button';
import Image from '@UI/Image';
import Link from '@UI/Link';
import OrderForm from '@Forms/OrderForm';
import ServicePageTitle from '@Components/ServicePageTitle';
import { useOrderForm } from '@Stores/OrderForm';
import useMedias from '@Hooks/useMedias';
import useScrollPosition from '@Hooks/useScrollPosition';
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

const CrossSales = loadable(() => import('./elems/CrossSales'));

const PageOrderCheck: FC<PageOrderCheckProps> = (props) => {
  const { className, page, profile, ...restProps } = props;
  const { isDesktop, isMobileM } = useMedias();
  const [sidebarStyles, setSidebarStyles] = useState(null);
  const orderForm = useOrderForm();
  const refContent = useRef<HTMLDivElement>(null);
  const refSidebar = useRef<HTMLDivElement>(null);
  const hasPosition = orderForm.positions.length > 0 || orderForm.removedPositions.length > 0;
  const headerHeight = isDesktop ? 0 : 90;

  const handleScroll = useCallback(() => {
    if (isMobileM) return;
    if (!refContent.current || !refSidebar.current) return;

    const rectContent = refContent.current.getBoundingClientRect();
    const rectSidebar = refSidebar.current.getBoundingClientRect();

    const boxContentBottom = Math.round(rectContent.bottom);
    const boxContentTop = Math.round(rectContent.top);
    const boxInfoBottom = Math.round(rectSidebar.bottom);
    const boxInfoTop = Math.round(rectSidebar.top);

    if (boxContentBottom <= boxInfoBottom && boxInfoTop <= headerHeight) {
      setSidebarStyles({
        position: 'absolute',
        bottom: 0,
      });
      return;
    }

    if (boxContentTop <= headerHeight) {
      setSidebarStyles({
        position: 'fixed',
        top: headerHeight,
        left: rectSidebar.left,
      });
    } else {
      setSidebarStyles(null);
    }
  }, [headerHeight, isMobileM]);

  useScrollPosition(handleScroll);

  // Reset sidebar position on mobile
  useEffect(() => {
    if (!isMobileM) return;

    setSidebarStyles(null);
  }, [isMobileM]);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      {hasPosition ? (
        <div className={styles.wrapper}>
          <ServicePageTitle className={styles.title} title='Оформление заказа' />

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
                prepaymentPercent={page.prepaymentPercent}
                profile={profile}
                ref={refSidebar}
                style={sidebarStyles}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.wrapperEmpty}>
          <ServicePageTitle title='Оформление заказа' />
          <div className={styles.emptyDesc}>В вашей корзине пока нет товаров</div>

          <Link to='/site/site-map'>
            <Button className={styles.btnContinue} wide>
              Продолжить покупки
            </Button>
          </Link>

          <Image
            className={styles.illustration}
            src='/react/static/img/empty-cart-illustration.svg'
            alt=''
          />

          {page.sections?.length > 0 && (
            <CrossSales className={styles.crossSales} sections={page.sections} />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(PageOrderCheck);
