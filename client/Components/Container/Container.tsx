import React, { FC, memo, HTMLAttributes } from 'react';

import cn from 'classnames';
import styles from './Container.module.css';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};

export default memo(Container);
