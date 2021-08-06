import React, { FC, FormEvent, memo, useCallback, useState, useEffect } from 'react';
import cn from 'classnames';

import { InputProps } from '@UI/Input';
import styles from './InputQuantity.module.css';

export interface OnChangeData {
  quantity: number;
}

export type OnChangeCallback = (e: FormEvent, data: OnChangeData) => void;

export interface InputQuantityProps extends Omit<InputProps, 'onChange'> {
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  onChange?: OnChangeCallback;
}

const InputQuantity: FC<InputQuantityProps> = (props) => {
  const { className, defaultValue, value, min, max, onChange, ...restProps } = props;
  const [count, setCount] = useState(defaultValue || value || 0);

  const normalizeCount = useCallback(
    (newCount: number) => {
      let quantity = newCount;

      if (min !== undefined && newCount < min) quantity = min;
      if (max !== undefined && newCount > max) quantity = max;

      return quantity;
    },
    [max, min],
  );

  const changeCount = useCallback(
    (e, newCount: number) => {
      const quantity = normalizeCount(newCount);

      if (onChange) onChange(e, { quantity });

      setCount(quantity);
    },
    [normalizeCount, onChange],
  );

  const handleChange = useCallback(
    (e) => {
      const newCount = Number(e.target.value.replace(/\D/, ''));

      changeCount(e, newCount);
    },
    [changeCount],
  );

  const handleMinus = useCallback(
    (e) => {
      const newCount = count - 1;

      changeCount(e, newCount);
    },
    [changeCount, count],
  );

  const handlePlus = useCallback(
    (e) => {
      const newCount = count + 1;

      changeCount(e, newCount);
    },
    [changeCount, count],
  );

  useEffect(() => {
    if (typeof value !== 'number') return;

    setCount(normalizeCount(value));
  }, [normalizeCount, value]);

  return (
    <div className={cn(styles.inputQuantity, className)}>
      <div className={cn(styles.icon, { [styles.minus]: true })} onClick={handleMinus}>
        -
      </div>
      <input {...restProps} className={styles.input} value={count} onChange={handleChange} />
      <div className={cn(styles.icon, { [styles.plus]: true })} onClick={handlePlus}>
        +
      </div>
    </div>
  );
};

export default memo(InputQuantity);
