/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, FC, memo, ReactChild } from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

export interface SizesProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  wide?: boolean;
  before?: ReactChild;
  theme?: 'primary' | 'secondary' | 'blank' | 'dirty' | 'linkSecondary' | 'circle';
  view?: 'main' | 'rounded';
}

const Button: FC<SizesProps> = (props) => {
  const {
    className,
    wide,
    title,
    before,
    children,
    type = 'button',
    theme = 'primary',
    view = 'main',
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      className={cn(
        styles.button,
        {
          [styles.wide]: wide,
          [styles.viewMain]: view === 'main',
          [styles.viewRounded]: view === 'rounded',
          [styles.themePrimary]: theme === 'primary',
          [styles.themeSecondary]: theme === 'secondary',
          [styles.themeBlank]: theme === 'blank',
          [styles.themeDirty]: theme === 'dirty',
          [styles.themeLinkSecondary]: theme === 'linkSecondary',
          [styles.themeCircle]: theme === 'circle',
        },
        className,
      )}
      type={type}
    >
      {before && <div className={styles.before}>{before}</div>}
      {title}
      {children}
    </button>
  );
};

export default memo(Button);
