import { useCallback, useState, useEffect, memo, FC, useMemo } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';
import { useQueryClient } from 'react-query';

import InputPhone from '@Components/InputPhone';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import RadioGroup from '@UI/RadioGroup';
import Price from '@UI/Price';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import OrderFormStore, { useOrderForm } from '@Stores/OrderForm';
import { Profile } from '@Types/Profile';
import Group from './elems/Group';
import SwitchBonuses from './elems/SwitchBonuses';
import CommentField from './elems/CommentField';
import PaymentList from './elems/PaymentList';
import PickupPoint from './elems/PickupPoint';
import styles from './OrderForm.module.css';
import PickupPointSelector from './elems/PickupPointSelector';

export interface OrderFormProps {
  className?: string;
  profile?: Profile;
}

const DeliveryCourier = loadable(() => import('./elems/DeliveryCourier'));

const OrderForm: FC<OrderFormProps> = (props) => {
  const { className, profile, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [wantBonuses, setWantBonuses] = useState(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [, { openModal }] = useModals();
  const queryClient = useQueryClient();
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

  const handleChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const handleChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleAuth = useCallback(() => {
    queryClient.invalidateQueries('profile');
  }, [queryClient]);

  const handleClickAuth = useCallback(() => {
    openModal('Authorization', {
      defaultPhone: phone,
      defaultName: name,
      defaultEmail: email,
      onSuccess: handleAuth,
    });
  }, [email, handleAuth, name, openModal, phone]);

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  // Заполняем поля формы, если человек авторизовался/зарегистрировался
  useEffect(() => {
    if (!profile) return;

    setWantBonuses(false);
    setName((prev) => prev || profile.firstName);
    setPhone((prev) => prev || profile.phone.slice(1));
    setEmail((prev) => prev || profile.email);
  }, [profile]);

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
          <Input wide name='OrderForm[first_name]' value={name} onChange={handleChangeName} />
        </FormItem>

        <FormItem label='Телефон*' view='secondary'>
          <div className={styles.wrapperInputPhone}>
            <InputPhone
              wide
              name='OrderForm[mobile]'
              className={styles.inputPhone}
              value={phone}
              onChange={handleChangePhone}
            />

            {wantBonuses && (
              <Button className={styles.btnReceiveCode} onClick={handleClickAuth}>
                Получить код в SMS
              </Button>
            )}
          </div>
        </FormItem>

        <FormItem label='Почта' view='secondary'>
          <Input wide name='OrderForm[email]' value={email} onChange={handleChangeEmail} />
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

        {orderForm.selectedDelivery.type === 'pickupPoint' && (
          <>
            {orderForm.selectedDelivery.address ? (
              <PickupPoint>{orderForm.selectedDelivery.address}</PickupPoint>
            ) : (
              <PickupPointSelector />
            )}
          </>
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
