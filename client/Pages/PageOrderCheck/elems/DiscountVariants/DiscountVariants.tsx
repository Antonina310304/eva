import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';

import Checkbox from '@UI/Checkbox';
import formatPrice from '@Utils/formatPrice';
import OrderFormStore, { useOrderForm } from '@Stores/OrderForm';
import { Profile } from '@Types/Profile';
import DiscountPromocode from '../DiscountPromocode';
import styles from './DiscountVariants.module.css';

export interface DiscountVariantsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  profile: Profile;
}

const DiscoutBonuses = loadable(() => import('../DiscountBonuses'));

const DiscountVariants: FC<DiscountVariantsProps> = (props) => {
  const { className, profile, ...restProps } = props;
  const orderForm = useOrderForm();
  const [waiting, setWaiting] = useState(false);
  const { bonusPoints, universalCoupon, selectedDiscountVariant } = orderForm;
  const hasCoupon = universalCoupon?.sum > 0;
  const hasSpentBonuses = bonusPoints?.spentAmount > 0;
  const disabled = hasCoupon || hasSpentBonuses || waiting;
  const isBonusesItem = selectedDiscountVariant === 'bonuses';
  const isPromocodeItem = selectedDiscountVariant === 'promocode';

  // TODO: удалить, когда разберемся почему не загружается профиль на /order/check
  bonusPoints.availableAmount = 300;

  const handleCheck = useCallback((_e, item: string) => {
    OrderFormStore.selectDiscountVariant(item);
  }, []);

  const handleRemove = useCallback(() => {
    OrderFormStore.selectDiscountVariant(null);
  }, []);

  const handleLoadStart = useCallback(() => {
    setWaiting(true);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setWaiting(false);
  }, []);

  return (
    <div
      {...restProps}
      className={cn(
        styles.variants,
        { [styles.completed]: hasCoupon || hasSpentBonuses },
        className,
      )}
    >
      {profile && bonusPoints.availableAmount > 0 && (
        <div className={cn(styles.item, { [styles.disabled]: disabled })}>
          <div className={styles.containerItem}>
            <Checkbox
              className={styles.checkbox}
              checked={isBonusesItem}
              disabled={disabled}
              onChange={(e) => handleCheck(e, 'bonuses')}
            />
            <div className={styles.info}>
              <div className={styles.text}>
                {`Оплатить бонусами, доступно `}
                <span className={styles.bonuses}>{formatPrice(bonusPoints.availableAmount)}</span>
              </div>
            </div>
          </div>

          {isBonusesItem && (
            <div className={styles.itemContent}>
              <DiscoutBonuses
                onRemove={handleRemove}
                onLoadStart={handleLoadStart}
                onLoadEnd={handleLoadEnd}
              />
            </div>
          )}
        </div>
      )}

      <div className={cn(styles.item, { [styles.disabled]: disabled })}>
        <div className={styles.containerItem}>
          <Checkbox
            className={styles.checkbox}
            checked={isPromocodeItem}
            disabled={disabled}
            onChange={(e) => handleCheck(e, 'promocode')}
          />
          <div className={styles.info}>
            <div className={styles.text}>Активировать промокод</div>
          </div>
        </div>

        {isPromocodeItem && (
          <div className={styles.itemContent}>
            <DiscountPromocode
              onRemove={handleRemove}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DiscountVariants);
