import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Dropdown.module.css';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
}

const Dropdown: FC<DropdownProps> = (props) => {
  const { className, label, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.tag, className)}>
      <div className={styles.containerLabel}>
        <span className={styles.label}>{label}</span>
        <div className={styles.arrow} />
      </div>
    </div>
  );
};

export default memo(Dropdown);
