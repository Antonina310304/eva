import React, { memo, InputHTMLAttributes, FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './RadioButton.module.css';

export interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  checked: boolean;
}
const RadioButton: FC<RadioButtonProps> = (props) => {
  const { className, checked, id, ...restProps } = props;
  const [radioId, setRadioId] = useState(id);

  useEffect(() => {
    setRadioId((prevId) => prevId || nanoid());
  }, []);

  return (
    <div className={cn(styles.radio, className)}>
      <input
        {...restProps}
        type='radio'
        className={styles.radioInput}
        checked={checked}
        id={radioId}
      />
      <label className={styles.customRadio} htmlFor={radioId} />
    </div>
  );
};

export default memo(RadioButton);
