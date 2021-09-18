import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Divider.module.css';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Divider: FC<DividerProps> = (props) => {
  const { className, ...restProps } = props;

  return <div {...restProps} className={cn(styles.divider, className)} />;
};

export default memo(Divider);
