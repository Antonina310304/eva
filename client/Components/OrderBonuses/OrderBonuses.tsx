import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import CounterPoints from '@Components/CounterPoints';
import useProfile from '@Queries/useProfile';
import useOrderBonuses from '@Queries/useOrderBonuses';
import styles from './OrderBonuses.module.css';

export type OrderBonusesStatus = 'loading' | 'resolved' | 'rejected';

export interface OrderBonusesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  productIds: number[];
}

const OrderBonuses: FC<OrderBonusesProps> = (props) => {
  const { className, productIds, ...restProps } = props;
  const profile = useProfile();
  const orderBonuses = useOrderBonuses({ productIds });
  const extra = orderBonuses.isSuccess && orderBonuses.data.extraBonus;

  return (
    <div {...restProps} className={cn(styles.bonuses, { [styles.extra]: extra }, className)}>
      {orderBonuses.isError && (
        <>
          <div className={styles.errorText}>Ошибка расчета бонусов</div>
        </>
      )}

      {orderBonuses.isLoading && (
        <>
          <div className={styles.preloaderText}>Считаем количество бонусов…</div>
        </>
      )}

      {orderBonuses.isSuccess && (
        <>
          <div className={styles.iconPoints} />
          <CounterPoints className={styles.count} income count={orderBonuses.data.earnedAmount} />
          <div className={styles.text}>за заказ</div>

          <div className={styles.popup}>
            {profile.data ? (
              <>
                {`Бонусы начисляются после оформления заказа и станут доступны через 14 дней после доставки товара. `}
                <Link to='/site/divan-club' target='_blank'>
                  Подробнее о программе лояльности
                </Link>
              </>
            ) : (
              <>
                {`Зарегистрируйтесь или авторизуйтесь в программе Divan Club. Бонусы начисляются сразу
                после оформления заказа и доступны для списания через 14 дней после доставки товара. `}
                <Link to='/site/divan-club' target='_blank'>
                  Подробнее о программе лояльности
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(OrderBonuses);
