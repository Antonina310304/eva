import React, { FC, HTMLAttributes, useState, memo, useCallback } from 'react';
import cn from 'classnames';

import styles from './Phone.module.css';

export interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Phone: FC<PhoneProps> = (props) => {
  const { className, ...restProps } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div
      {...restProps}
      className={cn(className, styles.phone, {
        [styles.open]: isOpen,
      })}
      onClick={handleClick}
    >
      <span className={styles.number}>+7 (495) 266 78 12</span>
      <span className={styles.arrow} />
    </div>
  );
};

export default memo(Phone);
