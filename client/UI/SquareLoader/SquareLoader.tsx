import React, { FC, memo } from 'react';
import cn from 'classnames';

import styles from './SquareLoader.module.css';

export interface SquareLoaderProps {
  className?: string;
  theme?: 'dark' | 'light';
}

const SquareLoader: FC<SquareLoaderProps> = (props: SquareLoaderProps) => {
  const { className, theme = 'dark', ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.loader,
        { [styles.themeDark]: theme === 'dark', [styles.themeLight]: theme === 'light' },
        className,
      )}
    />
  );
};

export default memo(SquareLoader);
