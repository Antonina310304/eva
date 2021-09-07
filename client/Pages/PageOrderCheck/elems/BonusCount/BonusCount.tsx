import React, { HTMLAttributes, FC, MouseEvent, memo } from 'react';
import cn from 'classnames';

import Icon12CloseBold from '@divanru/icons/dist/12/close_bold';

import Price from '@UI/Price';
import SquareLoader from '@UI/SquareLoader';
import styles from './BonusCount.module.css';

export interface BonusCountProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  price: number;
  waiting?: boolean;
  onRemove?: (e: MouseEvent) => void;
}

const BonusCount: FC<BonusCountProps> = (props) => {
  const { className, label, price, waiting, onRemove, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.bonusCount, [className])}>
      <div className={styles.label}>{label}</div>
      <Price className={styles.price} price={price} />
      {waiting ? (
        <div className={styles.loader}>
          <SquareLoader theme='dark' />
        </div>
      ) : (
        <Icon12CloseBold className={styles.iconRemove} onClick={onRemove} />
      )}
    </div>
  );
};

export default memo(BonusCount);
