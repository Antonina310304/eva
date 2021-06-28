import React, { FC, HTMLAttributes, memo } from 'react';

import declOfNum from '@divanru/ts-utils/declOfNum';
import formatPrice from '@divanru/ts-utils/formatPrice';

export interface CounterPointsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  titles?: string[];
  count: number;
  income?: boolean;
}

const CounterPoints: FC<CounterPointsProps> = (props) => {
  const { titles, count, income, ...restProps } = props;
  const incomeText = income ? '+' : '';

  return (
    <span {...restProps}>{`${incomeText}${formatPrice(count)} ${declOfNum(count, titles)}`}</span>
  );
};

CounterPoints.defaultProps = {
  titles: ['бонус', 'бонуса', 'бонусов'],
};

export default memo(CounterPoints);
