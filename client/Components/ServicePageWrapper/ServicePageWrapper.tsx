import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ServicePageWrapper.module.css';

export interface ServicePageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type?: string;
}

const ServicePageWrapper: FC<ServicePageWrapperProps> = (props) => {
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

export default memo(ServicePageWrapper);
