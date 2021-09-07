import React, { FC, HTMLAttributes, memo, useCallback, useState, useRef } from 'react';
import cn from 'classnames';

import Input from '@UI/Input';
import Button from '@UI/Button';
import Form from '@UI/Form';
import OrderFormStore, { useOrderForm } from '@Stores/OrderForm';
import BonusCount from '../BonusCount';
import styles from './DiscountPromocode.module.css';

export interface DiscountPromocodeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onRemove?: () => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

const inputName = 'CouponForm[code]';

const DiscountPromocode: FC<DiscountPromocodeProps> = (props) => {
  const { className, onRemove, onLoadStart, onLoadEnd, ...restProps } = props;
  const orderForm = useOrderForm();
  const hasCoupon = orderForm.universalCoupon?.sum > 0;
  const [serverErrors, setServerErrors] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const refReset = useRef(hasCoupon);
  const refSubmitButton = useRef<HTMLButtonElement>();

  const transformDataBeforeSubmit = useCallback(
    (data) => {
      const newData = { ...data, [inputName]: data[inputName].trim() };

      if (hasCoupon) {
        delete newData[inputName];
      }

      return newData;
    },
    [hasCoupon],
  );

  const handleError = useCallback(() => {
    setServerErrors([{ name: inputName, message: 'Неизвестная ошибка, попробуйте позже' }]);
  }, []);

  const handleSubmit = useCallback(() => {
    setWaiting(true);

    if (onLoadStart) onLoadStart();
  }, [onLoadStart]);

  const handleResponse = useCallback(
    (res) => {
      setWaiting(false);

      if (onLoadEnd) onLoadEnd();

      if (!res) {
        handleError();
        return;
      }

      if (res.ok) {
        const newCart = res.data;

        OrderFormStore.updateCouponInfo(newCart);

        if (!newCart.couponData) {
          refReset.current = false;

          if (onRemove) onRemove();
        }
      }

      if (!res.ok && res.errors) {
        setServerErrors(() => {
          return res.errors.map((error) => ({
            ...error,
            name: inputName,
          }));
        });
      }
    },
    [handleError, onLoadEnd, onRemove],
  );

  const handleRemoveCoupon = useCallback(() => {
    setServerErrors([]);
    refReset.current = true;
    refSubmitButton.current.click();
  }, []);

  return (
    <div {...restProps} className={cn(styles.discountBonuses, className)}>
      {hasCoupon && (
        <BonusCount
          waiting={waiting}
          label={orderForm.universalCoupon.text}
          price={orderForm.universalCoupon.sum}
          onRemove={handleRemoveCoupon}
        />
      )}

      <Form
        className={cn(styles.form, { [styles.hidden]: hasCoupon })}
        method='POST'
        action='/order/coupon'
        validationSchemaUrl='/json-schema/coupon-form'
        transformDataBeforeSubmit={transformDataBeforeSubmit}
        serverErrors={serverErrors}
        onResponse={handleResponse}
        onSubmit={handleSubmit}
        onError={handleError}
      >
        <Input
          className={styles.input}
          placeholder='Введите промокод'
          name={inputName}
          type='text'
          view='plain'
          autoComplete='off'
          autoFocus
        />

        <Button
          className={styles.button}
          theme='blank'
          type='submit'
          wide
          waiting={waiting}
          ref={refSubmitButton}
        >
          Применить
        </Button>
      </Form>
    </div>
  );
};

export default memo(DiscountPromocode);
