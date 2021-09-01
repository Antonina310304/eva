import React, { FC, HTMLAttributes, useState, memo } from 'react';

import cn from 'classnames';
import styles from './Phone.module.css';

export interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClick?: () => void;
}

const Phone: FC<PhoneProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      onClick={onClick}
      className={cn(className, styles.phone, {
        [styles.open]: isOpen,
      })}
    >
      <span className={styles.number}>+7 (495) 266 78 12</span>
      <span className={styles.arrow} />
    </div>
  );
};

export default memo(Phone);
