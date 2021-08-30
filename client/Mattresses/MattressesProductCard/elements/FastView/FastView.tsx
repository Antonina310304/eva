import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './FastView.module.css';

export interface FastViewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FastView: FC<FastViewProps> = (props) => {
  const { className, ...restProps } = props;

  return <div {...restProps} className={cn(styles.fastView, className)} />;
};

export default memo(FastView);
