import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Box.module.css';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  view?: 'check' | 'product';
}

const Box: FC<BoxProps> = (props) => {
  const { className, title, view, children, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.box,
        { [styles.viewCheck]: view === 'check', [styles.viewProduct]: view === 'product' },
        className,
      )}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default memo(Box);
