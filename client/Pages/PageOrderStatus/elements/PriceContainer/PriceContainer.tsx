import React, { FC } from 'react';

import Price, { PriceProps } from '@UI/Price';

const PriceContainer: FC<Omit<PriceProps, 'currency'>> = (props) => {
  return <Price {...props} />;
};

export default PriceContainer;
