import { FC, FormEvent, memo, useCallback, useState, useEffect } from 'react';
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
  const initValue = value || defaultValue || 0;
  const [count, setCount] = useState(initValue);

  const normalizeCount = useCallback(
    (newCount: number): number => {
      let quantity = newCount;

      if (min !== undefined && newCount < min) quantity = min;
      if (max !== undefined && newCount > max) quantity = max;

      return quantity;
    },
    [max, min],
  );

  const emitOnChange = useCallback(
    (e, params?: { quantity: number }) => {
      const quantity = normalizeCount(params ? params.quantity : count);

      if (onChange) onChange(e, { quantity });
      setCount(quantity);
    },
    [count, normalizeCount, onChange],
  );

  const handleChange = useCallback((e) => {
    const val = Number(e.target.value.replace(/\D/, ''));

    setCount(val);
  }, []);

  const handleBlur = useCallback(
    (e) => {
      emitOnChange(e);
    },
    [emitOnChange],
  );

  const handleMinus = useCallback(
    (e) => {
      emitOnChange(e, { quantity: count - 1 });
    },
    [count, emitOnChange],
  );

  const handlePlus = useCallback(
    (e) => {
      emitOnChange(e, { quantity: count + 1 });
    },
    [count, emitOnChange],
  );

  useEffect(() => {
    if (typeof value !== 'number') return;

    setCount(normalizeCount(value));
  }, [normalizeCount, value]);

  return (
    <div className={cn(styles.inputQuantity, className)}>
      <div className={styles.icon} onClick={handleMinus}>
        -
      </div>
      <input
        {...restProps}
        className={styles.input}
        value={count}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <div className={styles.icon} onClick={handlePlus}>
        +
      </div>
    </div>
  );
};

export default memo(InputQuantity);
