import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './Overlay.module.css';

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClick?: () => void;
}

const Overlay: FC<OverlayProps> = ({ isOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(styles.overlay, {
        [styles.show]: isOpen === true,
      })}
    />
  );
};

export default memo(Overlay);
