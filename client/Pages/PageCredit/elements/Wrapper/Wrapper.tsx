import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Wrapper.module.css';

export interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Wrapper: FC<WrapperProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      {children}
    </div>
  );
};

export default memo(Wrapper);
