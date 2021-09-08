import React, { FC, HTMLAttributes, memo, useCallback, useRef, useState } from 'react';
import cn from 'classnames';

import Input from '@UI/Input';
import Button from '@UI/Button';
import Form from '@UI/Form';
import OrderFormStore, { useOrderForm } from '@Stores/OrderForm';
import BonusCount from '../BonusCount';
import styles from './DiscountBonuses.module.css';

export interface DiscountBonusesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onRemove?: () => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

const inputName = 'BonusPointsForm[value]';

const DiscountBonuses: FC<DiscountBonusesProps> = (props) => {
  const { className, onRemove, onLoadStart, onLoadEnd, ...restProps } = props;
  const [serverErrors, setServerErrors] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const orderForm = useOrderForm();
  const refReset = useRef(false);
  const refSubmitButton = useRef<HTMLButtonElement>();
  const hasSpentBonuses = orderForm.bonusPoints?.spentAmount > 0;

  const transformDataBeforeSubmit = useCallback((data) => {
    return {
      [inputName]: refReset.current ? 0 : data[inputName],
    };
  }, []);

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

        if (!newCart.bonusPoints || newCart.bonusPoints?.spentAmount === 0) {
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

  const handleRemoveBonuses = useCallback(() => {
    if (!refSubmitButton.current) return;

    setServerErrors([]);
    refReset.current = true;
    refSubmitButton.current.click();
  }, []);

  return (
    <div {...restProps} className={cn(styles.discountBonuses, [className])}>
      {hasSpentBonuses && (
        <BonusCount
          waiting={waiting}
          label='Скидка бонусами'
          price={orderForm.bonusPoints.spentAmount}
          onRemove={handleRemoveBonuses}
        />
      )}

      <Form
        className={cn(styles.form, { [styles.hidden]: hasSpentBonuses })}
        method='POST'
        action='/order/set-amount-points-bonus'
        validationSchemaUrl='/json-schema/bonus-points-form'
        transformDataBeforeSubmit={transformDataBeforeSubmit}
        serverErrors={serverErrors}
        onResponse={handleResponse}
        onSubmit={handleSubmit}
        onError={handleError}
      >
        <Input
          className={styles.input}
          autoFocus
          name={inputName}
          autoComplete='off'
          type='text'
          view='plain'
        />

        <Button
          wide
          className={styles.button}
          theme='blank'
          type='submit'
          ref={refSubmitButton}
          waiting={waiting}
        >
          Списать
        </Button>
      </Form>
    </div>
  );
};

export default memo(DiscountBonuses);
