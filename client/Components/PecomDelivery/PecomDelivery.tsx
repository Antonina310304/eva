import { FC, HTMLAttributes, memo, useCallback, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import cn from 'classnames';

import * as ApiPecom from '@Api/Pecom';
import PecomMap from '@Components/PecomMap';
import useMeta from '@Queries/useMeta';
import Variant from './elems/Variant';
import Region from './elems/Region';
import styles from './PecomDelivery.module.css';

export interface PecomDeliveryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  delivery: any[];
  productId: number;
}

const PecomDelivery: FC<PecomDeliveryProps> = (props) => {
  const { className, delivery, productId, ...restProps } = props;
  const [refMap, inViewMap] = useInView({
    rootMargin: '0px',
    triggerOnce: true,
  });
  const meta = useMeta();
  const [deliveryTypes, setDeliveryTypes] = useState(delivery);
  const [pickupPoints, setPickupPoints] = useState([]);

  const loadPecom = useCallback(async () => {
    const tasks: any[] = [];

    deliveryTypes.forEach((dt) => {
      const isDelivery = dt.type === 'toAddress';

      tasks.push(() => {
        return ApiPecom.getDeliveryCost({
          isDelivery,
          goodsInfo: [{ id: productId, quantity: 1 }],
          receiverCityInfo: meta.data.region.name,
          courierAddress: isDelivery ? `${meta.data.region.name}, улица Ленина, д. 1` : '',
        });
      });
    });

    const prices = await Promise.all(tasks.map((task) => task()));

    setDeliveryTypes(() => {
      return deliveryTypes.map((dt, index) => ({
        ...dt,
        price: prices[index],
      }));
    });
  }, [deliveryTypes, meta.data, productId]);

  const loadWarehouses = useCallback(async () => {
    const warehouses = await ApiPecom.getWarehouses({ city: meta.data.region.name });

    setPickupPoints(warehouses);
  }, [meta.data]);

  // Загружаем нужные данные
  useEffect(() => {
    loadPecom();
    loadWarehouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div {...restProps} className={cn(styles.pecomDelivery, className)}>
      <Region className={styles.region} />

      <div className={styles.variants}>
        {deliveryTypes.map((deliveryType, index) => {
          return (
            <Variant
              className={styles.variant}
              key={index}
              text={deliveryType.name}
              price={deliveryType.price}
              popup={deliveryType.description ? <>{deliveryType.description}</> : undefined}
              parameters={[]}
            />
          );
        })}
      </div>

      <div className={styles.map} ref={refMap}>
        {inViewMap && pickupPoints.length > 0 && <PecomMap sellPoints={pickupPoints} />}
      </div>
    </div>
  );
};

export default memo(PecomDelivery);
