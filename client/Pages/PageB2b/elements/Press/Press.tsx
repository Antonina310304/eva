import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Press.module.css';

export interface PressProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Press: FC<PressProps> = (props) => {
  const { className, ...restProps } = props;

  return <div {...restProps} className={cn(styles.wrapper, className)} />;
};

export default memo(Press);
