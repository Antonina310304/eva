import React, { memo, FC, HTMLAttributes, ReactChild } from 'react';
import cn from 'classnames';

import styles from './FormItem.module.css';

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label?: ReactChild | string;
  bottom?: ReactChild | string;
  hidden?: boolean;
  view?: 'primary' | 'secondary';
  children: ReactChild | ReactChild[];
}

const FormItem: FC<FormItemProps> = (props) => {
  const { className, label, bottom, hidden, view = 'primary', children, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.formItem,
        {
          [styles.hidden]: hidden,
          [styles.viewPrimary]: view === 'primary',
          [styles.viewSecondary]: view === 'secondary',
        },
        className,
      )}
    >
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.content}>{children}</div>
      {bottom && <div className={styles.bottom}>{bottom}</div>}
    </div>
  );
};

export default memo(FormItem);
