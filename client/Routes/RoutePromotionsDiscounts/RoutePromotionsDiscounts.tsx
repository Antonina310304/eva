import React, { FC, memo } from 'react';
import { MetaData } from '@Types/Meta';

import TemplateMain from '@Templates/TemplateMain';
import PagePromotionsDiscounts from '@Pages/PagePromotionsDiscounts';

import mockMeta from './mockMeta';

const RouteCategory: FC = () => {
  return (
    <TemplateMain meta={mockMeta as MetaData}>
      <PagePromotionsDiscounts />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
