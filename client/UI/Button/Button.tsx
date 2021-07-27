import React, { ButtonHTMLAttributes, FC, memo, ReactChild, isValidElement } from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

export interface SizesProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  wide?: boolean;
  before?: ReactChild;
  theme?: 'primary' | 'secondary' | 'blank' | 'dirty' | 'linkSecondary' | 'linkPrimary' | 'circle';
  view?: 'main' | 'rounded';
}

const Button: FC<SizesProps> = (props) => {
  const {
    className,
    wide,
    before,
    children,
    type = 'button',
    theme = 'primary',
    view = 'main',
    ...restProps
  } = props;
  const isText =
    typeof children === 'string' ||
    (Array.isArray(children) && children.every((child) => typeof child === 'string'));

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
          [styles.themeLinkPrimary]: theme === 'linkPrimary',
          [styles.themeCircle]: theme === 'circle',
        },
        className,
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {before && <span className={styles.before}>{before}</span>}
      {isText ? <span className={styles.text}>{children}</span> : children}
    </button>
  );
};

export default memo(Button);
