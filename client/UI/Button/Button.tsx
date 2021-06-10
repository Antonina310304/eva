/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, FC, memo } from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

export interface SizesProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  wide?: boolean;
  theme?: 'primary' | 'blank';
  view?: 'main' | 'rounded';
}

const Button: FC<SizesProps> = (props) => {
  const {
    className,
    wide,
    type = 'button',
    title,
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
          [styles.themeBlank]: theme === 'blank',
        },
        className,
      )}
      type={type}
    >
      {title}
    </button>
  );
};

export default memo(Button);
