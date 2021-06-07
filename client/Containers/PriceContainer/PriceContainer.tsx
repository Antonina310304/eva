import React, { FC } from 'react';

import Price, { PriceProps } from '@divanru/ts-ui/Price';

import useMeta from '@Hooks/useMeta';

const PriceContainer: FC<Omit<PriceProps, 'currency'>> = (props) => {
  const meta = useMeta();

  return <Price {...props} currency={meta.currency} />;
};

export default PriceContainer;
