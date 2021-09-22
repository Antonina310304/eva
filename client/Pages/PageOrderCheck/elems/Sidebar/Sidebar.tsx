import { forwardRef, HTMLAttributes, useCallback } from 'react';
import cn from 'classnames';

import OrderBonuses from '@Components/OrderBonuses';
import Link from '@UI/Link';
import Price from '@UI/Price';
import { useCart } from '@Stores/Cart';
import useMeta from '@Queries/useMeta';
import useModals from '@Hooks/useModals';
import declOfNum from '@Utils/declOfNum';
import { Profile } from '@Types/Profile';
import DiscountVariants from '../DiscountVariants';
import styles from './Sidebar.module.css';

export interface DeliveryData {
  price?: number;
  description?: string;
}

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  delivery: DeliveryData;
  prepaymentPercent?: number;
  profile?: Profile;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const { className, delivery, prepaymentPercent, profile, ...restProps } = props;
  const [, { openModal }] = useModals();
  const meta = useMeta();
  const cart = useCart();

  const handleClickOferta = useCallback(() => {
    openModal('OfferAgreement');
  }, [openModal]);

  const handleClickDelivery = useCallback(() => {
    openModal('DeliveryInfo');
  }, [openModal]);

  if (!meta.isSuccess) return null;

  const isRus = meta.data.country === 'RUS';
  const republic = isRus ? 'РФ' : 'РБ';
  const countText = declOfNum(cart.count, ['товар', 'товара', 'товаров']);

  return (
    <div {...restProps} className={cn(styles.sidebar, className)} ref={ref}>
      <div className={styles.label}>{`Итого ${cart.count} ${countText}, без учета доставки`}</div>

      <Price className={styles.price} price={cart.cost} />

      {cart.bonusPoints?.earnedAmount > 0 && (
        <OrderBonuses className={styles.bonuses} count={cart.bonusPoints.earnedAmount} />
      )}

      <DiscountVariants profile={profile} />

      {delivery.price > 0 && (
        <div className={styles.wrapperDelivery}>
          <div className={styles.delivery}>
            <div className={styles.deliveryText}>Стоимость доставки:</div>
            <Price className={styles.deliveryPrice} price={delivery.price} />
          </div>
        </div>
      )}

      <div className={styles.wrapperLinks}>
        {isRus && (
          <Link
            preventDefault
            className={styles.link}
            to='/site/delivery'
            onClick={handleClickDelivery}
          >
            Доставка и оплата
          </Link>
        )}

        <Link
          preventDefault
          className={styles.link}
          to='/static-page/oferta'
          onClick={handleClickOferta}
        >
          Договор оферты
        </Link>
      </div>

      {cart.hasConfiguredPositions && (
        <div className={styles.constructorHint}>
          <p>
            {`Обратите внимание, что индивидуально подобранные решения требуют определенного времени
            на производство и обязательной предоплаты в размере ${prepaymentPercent}% от стоимости, т.к.
            изготавливаются исключительно под ваш заказ из выбранных комплектующих.`}
          </p>
          <p>
            {`В соответствии с действующим законодательством ${republic} предоплата, внесенная за товар,
            изготовленный по индивидуальному заказу, в случае отказа Покупателя, возврату не
            подлежит.`}
          </p>
          <p>После осуществления заказа мы свяжемся с вами, чтобы уточнить все детали.</p>
        </div>
      )}
    </div>
  );
});

export default Sidebar;
