import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Wrapper.module.css';

export interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type?: string;
}

const Wrapper: FC<WrapperProps> = (props) => {
  const { className, children, type, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(styles.wrapper, { [styles.wide]: type === 'wide' }, className)}
    >
      {children}
    </div>
  );
};

export default memo(Wrapper);
