import React, { FC, FormEvent, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import { InputProps } from '@UI/Input';
import styles from './InputQuantity.module.css';

export interface OnChangeData {
  count: number;
}

export interface InputQuantityProps extends Omit<InputProps, 'onChange'> {
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (e: FormEvent, data: OnChangeData) => void;
}

const InputQuantity: FC<InputQuantityProps> = (props) => {
  const { className, defaultValue, value, min, max, onChange, ...restProps } = props;
  const [count, setCount] = useState(defaultValue || value || 0);

  const changeCount = useCallback(
    (e, newCount: number) => {
      let r = newCount;

      if (min !== undefined && newCount < min) r = min;
      if (max !== undefined && newCount > max) r = max;
      if (onChange) onChange(e, { count: r });

      setCount(r);
    },
    [max, min, onChange],
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
