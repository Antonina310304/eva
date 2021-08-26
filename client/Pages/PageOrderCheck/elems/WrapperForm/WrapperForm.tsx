import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './WrapperForm.module.css';

export interface WrapperFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}

const WrapperForm: FC<WrapperFormProps> = (props) => {
  const { className, title, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default memo(WrapperForm);
