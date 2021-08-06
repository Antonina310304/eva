import React, { FC, HTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import styles from './Sizes.module.css';

export interface SizeData {
  title: string;
  value: string;
}

export interface SizesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  sizes: SizeData[];
}

const Sizes: FC<SizesProps> = (props) => {
  const { className, label, sizes, ...restProps } = props;

  const value = useMemo(() => {
    return '';
  }, []);

  return (
    <div {...restProps} className={cn(styles.sizes, className)}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default memo(Sizes);
