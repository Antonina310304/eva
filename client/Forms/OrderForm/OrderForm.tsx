import React, { useCallback, useState, memo, FC, useMemo } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import InputPhone from '@Components/InputPhone';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import RadioGroup from '@UI/RadioGroup';
import { useCart } from '@Stores/Cart';
import { DeliveryTypeData } from '@Types/Cart';
import Group from './elems/Group';
import SwitchBonuses from './elems/SwitchBonuses';
import CommentField from './elems/CommentField';
import styles from './OrderForm.module.css';

export interface OrderFormProps {
  className?: string;
}

const DeliveryCourier = loadable(() => import('./elems/DeliveryCourier'));

const OrderForm: FC<OrderFormProps> = (props) => {
  const { className, ...restProps } = props;
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<DeliveryTypeData['id']>(() => {
    return cart.deliveryTypes[0].id;
  });

  const selectedDelivery = useMemo(() => {
    return cart.deliveryTypes.find((dt) => dt.id === selectedDeliveryId);
  }, [cart.deliveryTypes, selectedDeliveryId]);

  const deliveryVariants = useMemo(() => {
    return cart.deliveryTypes.map((deliveryType, index) => ({
      defaultChecked: index === 0,
      value: deliveryType.id,
      children: deliveryType.name,
    }));
  }, [cart.deliveryTypes]);

  const handleChangeDelivery = useCallback((_e, item) => {
    setSelectedDeliveryId(item.value);
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  return (
    <Form
      {...restProps}
      className={cn(styles.form, className)}
      action='/order/check'
      validationSchemaUrl='/json-schema/order-form.json'
      onSubmit={handleSubmit}
    >
      <Group className={styles.group} cropped>
        <FormItem className={styles.switchBonusesItem}>
          <SwitchBonuses />
        </FormItem>

        <FormItem label='Имя' view='secondary'>
          <Input wide name='name' />
        </FormItem>

        <FormItem label='Телефон*' view='secondary'>
          <InputPhone wide name='phone' />
        </FormItem>

        <FormItem label='Почта' view='secondary'>
          <Input wide name='email' />
        </FormItem>
      </Group>

      <Group className={styles.group} title='Выберите способ доставки' cropped>
        <RadioGroup
          className={styles.deliveryRadioGroup}
          name='delivery'
          items={deliveryVariants}
          onChange={handleChangeDelivery}
        />

        {selectedDelivery.type === 'toAddress' && (
          <DeliveryCourier deliveryType={selectedDelivery} />
        )}
      </Group>

      <Group className={styles.group} title='Выберите способ оплаты'>
        Content
      </Group>

      <Group className={styles.group}>
        <CommentField label='Добавить комментарий к заказу' />
      </Group>

      <div className={styles.footer}>
        <Button className={styles.btnSubmit} type='submit' wide>
          Подтверждаю заказ
        </Button>
      </div>
    </Form>
  );
};

export default memo(OrderForm);
