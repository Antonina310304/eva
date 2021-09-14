import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './Overlay.module.css';

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
}

const Overlay: FC<OverlayProps> = (props) => {
  const { className, visible, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.overlay,
        {
          [styles.visible]: visible,
        },
        className,
      )}
    />
  );
};

export default memo(Overlay);
