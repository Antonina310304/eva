import React, { useCallback, useState, memo, FC, useMemo } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import InputPhone from '@Components/InputPhone';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import RadioGroup from '@UI/RadioGroup';
import Price from '@UI/Price';
import Link from '@UI/Link';
import OrderFormStore, { useOrderForm } from '@Stores/OrderForm';
import { Profile } from '@Types/Profile';
import Group from './elems/Group';
import SwitchBonuses from './elems/SwitchBonuses';
import CommentField from './elems/CommentField';
import PaymentList from './elems/PaymentList';
import styles from './OrderForm.module.css';

export interface OrderFormProps {
  className?: string;
  profile?: Profile;
}

const DeliveryCourier = loadable(() => import('./elems/DeliveryCourier'));

const OrderForm: FC<OrderFormProps> = (props) => {
  const { className, profile, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [wantBonuses, setWantBonuses] = useState(false);
  const orderForm = useOrderForm();
  const paymentsAsSelect = orderForm.visiblePaymentTypes.length > 3;

  const deliveryVariants = useMemo(() => {
    return orderForm.deliveryTypes.map((deliveryType, index) => ({
      defaultChecked: index === 0,
      value: deliveryType.id,
      children: deliveryType.name,
    }));
  }, [orderForm.deliveryTypes]);

  const handleChangeWantBonuses = useCallback(() => {
    setWantBonuses((prev) => !prev);
  }, []);

  const handleChangePaymentVariant = useCallback((e, paymentVariant) => {
    OrderFormStore.select({ paymentVariant: paymentVariant.id });

    // Событие в аналитику при изменении варианта оплаты
    (window.dataLayer = window.dataLayer || []).push({
      eCategory: 'checkBox',
      eAction: 'activate',
      eLabel: paymentVariant.description,
      eNI: false,
      event: 'GAEvent',
    });
  }, []);

  const handleCheckPaymentType = useCallback((_e, paymentType) => {
    OrderFormStore.select({ paymentType: paymentType.id });

    // Событие в аналитику при изменении способа оплаты
    (window.dataLayer = window.dataLayer || []).push({
      eCategory: 'checkBox',
      eAction: 'activate',
      eLabel: paymentType.name,
      eNI: false,
      event: 'GAEvent',
    });
  }, []);

  const handleChangeDelivery = useCallback((_e, item) => {
    OrderFormStore.select({ delivery: item.value });
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
          {profile ? (
            <div className={styles.formUser}>
              {`Участник `}
              <Link to='/site/divan-club' target='_blank' view='native'>
                Divan.Club
              </Link>
            </div>
          ) : (
            <SwitchBonuses checked={wantBonuses} onChange={handleChangeWantBonuses} />
          )}
        </FormItem>

        <FormItem label='Имя' view='secondary'>
          <Input wide name='OrderForm[first_name]' />
        </FormItem>

        <FormItem label='Телефон*' view='secondary'>
          <div className={styles.wrapperInputPhone}>
            <InputPhone wide name='OrderForm[mobile]' className={styles.inputPhone} />

            {wantBonuses && (
              <Button type='submit' className={styles.btnReceiveCode}>
                Получить код в SMS
              </Button>
            )}
          </div>
        </FormItem>

        <FormItem label='Почта' view='secondary'>
          <Input wide name='OrderForm[email]' />
        </FormItem>
      </Group>

      <Group className={styles.group} title='Выберите способ доставки' cropped>
        <RadioGroup
          className={styles.deliveryRadioGroup}
          name='OrderForm[delivery_type_id]'
          items={deliveryVariants}
          onChange={handleChangeDelivery}
        />

        {orderForm.selectedDelivery.type === 'toAddress' && (
          <DeliveryCourier deliveryType={orderForm.selectedDelivery} name='OrderForm[address]' />
        )}
      </Group>

      {orderForm.visiblePaymentTypes.length > 0 && (
        <Group className={styles.group} title='Выберите способ оплаты' cropped={paymentsAsSelect}>
          <PaymentList
            paymentTypes={orderForm.visiblePaymentTypes}
            checkedType={orderForm.selectedPaymentType}
            asSelect={paymentsAsSelect}
            title='Способ оплаты'
            name='OrderForm[payment_type_id]'
            onCheck={handleCheckPaymentType}
          />

          {orderForm.availablePaymentVariants.length > 1 && (
            <RadioGroup
              className={styles.variantsRadioGroup}
              name='OrderForm[payment_variant]'
              items={orderForm.availablePaymentVariants.map((paymentVariant) => {
                const checked = orderForm.selectedPaymentVariant?.id === paymentVariant.id;

                return {
                  defaultChecked: checked,
                  value: paymentVariant.id,
                  children: (
                    <div>
                      {`${paymentVariant.description} `}
                      {paymentVariant.sum > 0 && <Price price={paymentVariant.sum} />}
                    </div>
                  ),
                };
              })}
              onChange={handleChangePaymentVariant}
            />
          )}
        </Group>
      )}

      <Group className={styles.group} cropped>
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
