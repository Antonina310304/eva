import React, { forwardRef, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Popup.module.css';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const { className, visible, children, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(styles.popup, { [styles.visible]: visible }, className)}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default memo(Popup);
