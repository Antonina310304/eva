import { FC, HTMLAttributes, memo, useCallback, useState, useEffect } from 'react';
import cn from 'classnames';

import * as ApiPecom from '@Api/Pecom';
import PecomMap from '@Components/PecomMap';
import Price from '@UI/Price';
import logger from '@Utils/logger';
import styles from './PickupPoint.module.css';

export interface PickupPointProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  region: string;
}

const PickupPoint: FC<PickupPointProps> = (props) => {
  const { className, region, ...restProps } = props;
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadWarehouses = useCallback(async () => {
    try {
      const warehouses = await ApiPecom.getWarehouses({ city: region });

      setPickupPoints(warehouses);
    } catch (err) {
      logger(err);
    } finally {
      setLoaded(true);
    }
  }, [region]);

  // Загружаем список пунктов выдачи
  useEffect(() => {
    loadWarehouses();
  }, [loadWarehouses]);

  return (
    <div {...restProps} className={cn(styles.container, className)}>
      <div className={styles.text}>
        Доставка заказов до пункта самовывоза производится транспортной компанией &quot;ПЭК&quot;.
      </div>
      <div className={styles.text}>
        Стоимость зависит от объема заказа. Минимальная стоимость доставки в вашем регионе
        составляет
        <Price className={styles.price} price={1000} />
      </div>
      <div className={styles.mapTitle}>Адреса пунктов самовывоза:</div>
      {loaded && pickupPoints.length > 0 ? (
        <PecomMap className={styles.map} sellPoints={pickupPoints} />
      ) : (
        <div className={styles.map} />
      )}
    </div>
  );
};

export default memo(PickupPoint);
