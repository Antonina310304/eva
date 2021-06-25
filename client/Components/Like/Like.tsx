import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Like.module.css';

export interface LikeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Like: FC<LikeProps> = (props) => {
  const { className, ...restProps } = props;

  return <div {...restProps} className={cn(styles.like, className)} />;
};

export default memo(Like);
