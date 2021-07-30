import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './IconClose.module.css';

export interface IconCloseProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const IconClose: FC<IconCloseProps> = (props) => {
  const { className, ...restProps } = props;

  return <div {...restProps} className={cn(styles.iconClose, className)} />;
};

export default memo(IconClose);
