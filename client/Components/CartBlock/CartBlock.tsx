import { FC, HTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import { CartData } from '@Types/Cart';
import declOfNum from '@Utils/declOfNum';
import Price from '@UI/Price';
import Image from '@UI/Image';
import Link from '@UI/Link';
import PecIcon from './pecIcon.svg';
import PositionsSection from './elements/PositionsSection';
import ProductCard from './elements/ProductCard';
import styles from './CartBlock.module.css';

export interface CartBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  cart: CartData;
  deliveryCost: { courierSum: number; pickupSum: number };
  type: 'pickupPoint' | 'toAddress';
}

const CartBlock: FC<CartBlockProps> = (props) => {
  const { className, cart, deliveryCost, type, ...restProps } = props;
  const units = declOfNum(cart.count, ['товар', 'товара', 'товаров']);

  const deliveryInfo = useMemo(() => {
    const isCourier = type === 'toAddress';

    if (!deliveryCost) return null;

    return {
      text: isCourier
        ? 'Доставка транспортной компанией «ПЭК» до подъезда'
        : 'Доставка ТК «ПЭК» до пункта выдачи',
      price: isCourier ? deliveryCost.courierSum : deliveryCost.pickupSum,
    };
  }, [deliveryCost, type]);

  return (
    <div {...restProps} className={cn(styles.cart, className)}>
      <div className={styles.container}>
        <div className={styles.info}>
          {`В вашей корзине ${cart.count} ${units} на сумму `}
          <Price price={cart.cost} />
        </div>
        {cart.positions?.length > 0 && (
          <PositionsSection
            className={styles.productsList}
            title='Ваша корзина'
            positions={cart.positions}
            renderItem={({ product, position }) => (
              <div className={styles.productItem}>
                <ProductCard product={product} />
                <div className={styles.productCount}>{`Кол-во: ${position.quantity} шт.`}</div>
              </div>
            )}
          />
        )}
        {deliveryInfo && (
          <div className={styles.deliveryInfo}>
            <Image src={PecIcon} className={styles.pecIcon} />
            <div className={styles.deliveryText}>
              {`${deliveryInfo.text} `}
              <Price price={deliveryInfo.price} />
            </div>
          </div>
        )}
        <Link className={styles.button} asButton to='/order/check'>
          Оформить заказ
        </Link>
      </div>
    </div>
  );
};

export default memo(CartBlock);
