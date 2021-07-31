import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './IconClose.module.css';

export interface IconCloseProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  view?: 'default' | 'circle';
}

const IconClose: FC<IconCloseProps> = (props) => {
  const { className, view = 'default', ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.iconClose,
        { [styles.viewDefault]: view === 'default', [styles.viewCircle]: view === 'circle' },
        className,
      )}
    />
  );
};

export default memo(IconClose);
