import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Select.module.css';

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Select: FC<SelectProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.select, className)}>
      Select
    </div>
  );
};

export default memo(Select);
