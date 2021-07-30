import React, { memo, FC, HTMLAttributes, ReactChild } from 'react';
import cn from 'classnames';

import styles from './FormItem.module.css';

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  top?: ReactChild | string;
  bottom?: ReactChild | string;
  hidden?: boolean;
  children: ReactChild | ReactChild[];
}

const FormItem: FC<FormItemProps> = (props) => {
  const { className, top, bottom, hidden, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.formItem, { [styles.hidden]: hidden }, className)}>
      {top && <div className={styles.top}>{top}</div>}
      {children}
      {bottom && <div className={styles.bottom}>{bottom}</div>}
    </div>
  );
};

export default memo(FormItem);
