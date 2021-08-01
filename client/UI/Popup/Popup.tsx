import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Popup.module.css';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
}

const Popup: FC<PopupProps> = (props) => {
  const { className, visible, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.popup, { [styles.visible]: visible }, className)}>
      {children}
    </div>
  );
};

export default memo(Popup);
