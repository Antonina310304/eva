import { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Sizes.module.css';

export interface SizeItemData {
  title: string;
  value: number;
  unit: string;
}

export interface SizesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sizes: SizeItemData[];
}

const Sizes: FC<SizesProps> = (props: SizesProps) => {
  const { className, sizes, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.sizes, className)}>
      {'Размеры: '}
      {sizes.map(({ value }, index) => (
        <div className={styles.item} key={index}>
          <div className={styles.value}>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default memo(Sizes);
