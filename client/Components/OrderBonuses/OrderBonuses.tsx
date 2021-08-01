import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Popup from '@UI/Popup';
import CounterPoints from '@Components/CounterPoints';
import useProfile from '@Queries/useProfile';
import useOrderBonuses from '@Queries/useOrderBonuses';
import useOnClickOutside from '@Hooks/useOnClickOutside';
import styles from './OrderBonuses.module.css';

export type OrderBonusesStatus = 'loading' | 'resolved' | 'rejected';

export interface OrderBonusesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  productIds: number[];
}

const OrderBonuses: FC<OrderBonusesProps> = (props) => {
  const { className, productIds, ...restProps } = props;
  const [visiblePopup, setVisiblePopup] = useState(false);
  const profile = useProfile();
  const orderBonuses = useOrderBonuses({ productIds });
  const extra = orderBonuses.isSuccess && orderBonuses.data.extraBonus;

  const handleClickBonuses = useCallback(() => {
    setVisiblePopup((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback(() => {
    setVisiblePopup(false);
  }, []);

  const refPopup = useOnClickOutside(handleClickOutside);

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

          <div className={styles.wrapperCount} ref={refPopup}>
            <CounterPoints
              className={styles.count}
              income
              count={orderBonuses.data.earnedAmount}
              onClick={handleClickBonuses}
            />
            <Popup className={styles.popup} visible={visiblePopup}>
              {profile.data ? (
                <>
                  {`Бонусы начисляются после оформления заказа и станут доступны через 14 дней после доставки товара. `}
                  <Link
                    className={styles.link}
                    to='/site/divan-club'
                    target='_blank'
                    view='native'
                    size='s'
                  >
                    Подробнее о программе лояльности
                  </Link>
                </>
              ) : (
                <>
                  {`Зарегистрируйтесь или авторизуйтесь в программе Divan Club. Бонусы начисляются сразу
                после оформления заказа и доступны для списания через 14 дней после доставки товара. `}
                  <Link
                    className={styles.link}
                    to='/site/divan-club'
                    target='_blank'
                    view='native'
                    size='s'
                  >
                    Подробнее о программе лояльности
                  </Link>
                </>
              )}
            </Popup>
          </div>

          <div className={styles.text}>за заказ</div>
        </>
      )}
    </div>
  );
};

export default memo(OrderBonuses);
