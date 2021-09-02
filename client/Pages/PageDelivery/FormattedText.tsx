import React, { FC, Fragment, memo } from 'react';

import CurrencySymbol from '@UI/CurrencySymbol';

export interface Props {
  children: string;
  currency: 'RUB' | 'BYN';
}

const FormattedText: FC<Props> = ({ children, currency }) => {
  const chanks = children.split('{rub}');

  return (
    <>
      {chanks.map((str, index) => {
        const isNotLast = index !== chanks.length - 1;

        return (
          <Fragment key={index}>
            {str}
            {isNotLast && <CurrencySymbol currency={currency} />}
          </Fragment>
        );
      })}
    </>
  );
};

export default memo(FormattedText);
