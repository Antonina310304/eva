import React, { FC, HTMLAttributes, memo } from 'react';

import declOfNum from '@Utils/declOfNum';
import formatPrice from '@Utils/formatPrice';

export interface CounterPointsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  titles?: string[];
  count: number;
  income?: boolean;
}

const CounterPoints: FC<CounterPointsProps> = (props) => {
  const { titles = ['бонус', 'бонуса', 'бонусов'], count, income, ...restProps } = props;
  const incomeText = income ? '+' : '';

  return (
    <span {...restProps}>{`${incomeText}${formatPrice(count)} ${declOfNum(count, titles)}`}</span>
  );
};

export default memo(CounterPoints);
