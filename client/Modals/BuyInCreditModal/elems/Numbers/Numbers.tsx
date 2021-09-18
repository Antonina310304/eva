import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { InstallmentVariant } from '@Types/InstallmentBank';
import { NumberItem } from './typings';
import styles from './Numbers.module.css';
import generateNumbers from './generateNumbers';

export interface NumbersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant: InstallmentVariant;
}

const Numbers: FC<NumbersProps> = (props) => {
  const { className, variant, ...restProps } = props;

  const items: NumberItem[] = generateNumbers(variant);

  return (
    <div {...restProps} className={cn(styles.numbers, className)}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {item.before && <div className={styles.before}>{item.before}</div>}
          <div className={styles.value}>{item.value}</div>
          {item.after && <div className={styles.after}>{item.after}</div>}
        </div>
      ))}
    </div>
  );
};

export default Numbers;
