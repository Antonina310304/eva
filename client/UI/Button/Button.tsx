import React, { ButtonHTMLAttributes, FC, memo, ReactChild } from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

export interface SizesProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  wide?: boolean;
  before?: ReactChild;
  theme?: 'primary' | 'secondary' | 'blank' | 'dirty' | 'linkSecondary' | 'linkPrimary' | 'circle';
  view?: 'main' | 'rounded' | 'circle';
  size?: 'l' | 'm' | 's';
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
    size,
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
          [styles.viewCircle]: view === 'circle',
          [styles.themePrimary]: theme === 'primary',
          [styles.themeSecondary]: theme === 'secondary',
          [styles.themeBlank]: theme === 'blank',
          [styles.themeDirty]: theme === 'dirty',
          [styles.themeLinkSecondary]: theme === 'linkSecondary',
          [styles.themeLinkPrimary]: theme === 'linkPrimary',
          [styles.themeCircle]: theme === 'circle',
          [styles.sizeL]: size === 'l',
          [styles.sizeM]: size === 'm',
          [styles.sizeS]: size === 's',
        },
        className,
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {before && <div className={styles.before}>{before}</div>}
      {children}
    </button>
  );
};

export default memo(Button);
