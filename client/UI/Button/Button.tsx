import React, { ButtonHTMLAttributes, memo, ReactChild, forwardRef, useMemo } from 'react';
import cn from 'classnames';

import Loader from '@UI/Loader';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  wide?: boolean;
  before?: ReactChild;
  theme?: 'primary' | 'secondary' | 'blank' | 'dirty' | 'linkSecondary' | 'linkPrimary' | 'circle';
  view?: 'main' | 'rounded' | 'circle';
  size?: 'l' | 'm' | 's';
  color?: string;
  waiting?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    wide,
    before,
    children,
    type = 'button',
    theme = 'primary',
    view = 'main',
    size,
    color,
    waiting,
    ...restProps
  } = props;
  const isText =
    typeof children === 'string' ||
    (Array.isArray(children) && children.every((child) => typeof child === 'string'));

  const content = useMemo(() => {
    if (waiting) return <Loader />;

    return <>{isText ? <span className={styles.text}>{children}</span> : children}</>;
  }, [waiting, isText, children]);

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
      style={color ? { backgroundColor: color, borderColor: color } : undefined}
      ref={ref}
    >
      {before && <span className={styles.before}>{before}</span>}
      {content}
    </button>
  );
});

export default memo(Button);
