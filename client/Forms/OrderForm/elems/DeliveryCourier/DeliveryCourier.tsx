import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import { ApiPecom } from '@Api/Pecom';
import InputHelperAddress from '@Components/InputHelperAddress';
import FormItem from '@UI/FormItem';
import Input from '@UI/Input';
import Price from '@UI/Price';
import CartStore, { useCart } from '@Stores/Cart';
import useMeta from '@Queries/useMeta';
import { DeliveryTypeData } from '@Types/Cart';
import styles from './DeliveryCourier.module.css';

export interface DeliveryCourierProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  deliveryType: DeliveryTypeData;
}

const DeliveryCourier: FC<DeliveryCourierProps> = (props) => {
  const { className, deliveryType, ...restProps } = props;
  const [waiting, setWaiting] = useState(false);
  const cart = useCart();
  const meta = useMeta({ ssr: true });

  const handleSelectHint = useCallback(
    async (_e, hint) => {
      setWaiting(true);

      CartStore.updateDeliveryType(deliveryType.id, { address: hint.title });

      try {
        const goodsInfo: any[] = [];

        // Собираем данные по корзине
        cart.positions.forEach((position) => {
          position.products.forEach((product) => {
            goodsInfo.push({
              id: product.id,
              quantity: product.quantity,
            });
          });
        });

        const sum = await ApiPecom.getDeliveryCost({
          goodsInfo,
          isDelivery: true,
          courierAddress: hint.title,
          receiverCityInfo: {
            latitude: Number(hint.data.latitude),
            longitude: Number(hint.data.longitude),
          },
        });

        CartStore.updateDeliveryType(deliveryType.id, { sum });

        // removeError(checkedDelivery.id);
      } catch (err) {
        // addError(err, hint);
      } finally {
        setWaiting(false);
      }
    },
    [cart.positions, deliveryType.id],
  );

  if (!meta.isSuccess) return null;

  const InnerInput = meta.data.region.isPec ? InputHelperAddress : Input;

  return (
    <div {...restProps} className={cn(styles.delivery, className)}>
      <FormItem label='Адрес' view='secondary'>
        <InnerInput
          wide
          name='address'
          placeholder='город, улица, дом, этаж, квартира'
          value={deliveryType.address || ''}
          onSelectHint={handleSelectHint}
        />
      </FormItem>

      {deliveryType.description && <div className={styles.hint}>{deliveryType.description}</div>}

      {deliveryType.sum && <Price className={styles.price} price={deliveryType.sum} />}
    </div>
  );
};

export default memo(DeliveryCourier);
