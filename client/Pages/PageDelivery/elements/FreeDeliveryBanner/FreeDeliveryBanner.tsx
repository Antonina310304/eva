import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Image from '@UI/Image';
import styles from './FreeDeliveryBanner.module.css';

import Car from './car.svg';

export interface FreeDeliveryBannerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FreeDeliveryBanner: FC<FreeDeliveryBannerProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.banner, className)}>
      <div className={styles.main}>
        <div className={styles.title}>Бесплатная доставка</div>
        <div className={styles.textContainer}>
          <div className={styles.text}>
            Привезем бесплатно при заказе от
            {` `}
            <Price className={styles.price} price={1500} />
          </div>
          <div className={styles.text}>Бесплатная доставка в пределах МКАД и до 10 км от МКАД.</div>
          <div className={styles.text}>
            Не распространяется на заказы, оформленные с промокодом и в рассрочку.
          </div>
        </div>
      </div>
      <Image src={Car} className={styles.image} />
    </div>
  );
};

export default memo(FreeDeliveryBanner);
