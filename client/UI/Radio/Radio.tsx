import React, {
  FC,
  InputHTMLAttributes,
  ReactElement,
  FormEvent,
  memo,
  cloneElement,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { nanoid } from 'nanoid';
import cn from 'classnames';

import styles from './Radio.module.css';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  icon?: ReactElement;
}

const Radio: FC<RadioProps> = (props) => {
  const { className, id, icon, children, ...restProps } = props;
  const [innerId, setInnerId] = useState(id);

  useEffect(() => {
    if (id) return;

    setInnerId(`id${nanoid()}`);
  }, [id]);

  return (
    <div className={cn(styles.radio, className)}>
      <input {...restProps} type='radio' id={innerId} className={styles.control} />

      <label className={styles.label} htmlFor={innerId}>
        <div className={styles.box} />
        {icon && (
          <>
            {cloneElement(icon, {
              ...icon.props,
              className: cn(styles.icon, icon.props.className),
            })}
          </>
        )}
        {children}
      </label>
    </div>
  );
};

export default memo(Radio);
