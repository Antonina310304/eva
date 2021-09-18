import { memo, FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import Image from '../Image';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  text?: string;
  icon?: string;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { className, text, icon, children, disabled, ...restProps } = props;

  return (
    <label className={cn(styles.checkbox, { [styles.disabled]: disabled }, className)}>
      <input className={styles.control} type='checkbox' {...restProps} disabled={disabled} />
      <div className={styles.box}>
        <div className={styles.iconCheck} />
      </div>
      {icon && <Image className={styles.icon} src={icon} />}
      {text && <span className={styles.text}>{text}</span>}
      {children}
    </label>
  );
};

export default memo(Checkbox);
