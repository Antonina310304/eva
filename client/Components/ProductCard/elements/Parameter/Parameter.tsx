import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Parameter.module.css';

export interface ParameterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}

const Parameter: FC<ParameterProps> = (props) => {
  const { className, title, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.tag, className)}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
};

export default memo(Parameter);
