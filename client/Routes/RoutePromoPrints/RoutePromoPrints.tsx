import React, { FC, memo } from 'react';
import { MetaData } from '@Types/Meta';

import TemplateMain from '@Templates/TemplateMain';
import PagePromoPrints from '@Pages/PagePromoPrints';

import mockMeta from './mockMeta';

const RouteCategory: FC = () => {
  return (
    <TemplateMain meta={mockMeta as MetaData}>
      <PagePromoPrints />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
