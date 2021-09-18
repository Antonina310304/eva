import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './IconClose.module.css';

export interface IconCloseProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  view?: 'default' | 'circle';
  size?: 's' | 'm';
  theme?: 'inverse';
}

const IconClose: FC<IconCloseProps> = (props) => {
  const { className, view = 'default', size = 'm', theme, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.iconClose,
        {
          [styles.viewDefault]: view === 'default',
          [styles.viewCircle]: view === 'circle',
          [styles.sizeS]: size === 's',
          [styles.sizeM]: size === 'm',
          [styles.themeInverse]: theme === 'inverse',
        },
        className,
      )}
    />
  );
};

export default memo(IconClose);
