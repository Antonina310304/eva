import React, { FC, memo } from 'react';
import { MetaData } from '@Types/Meta';

import TemplateMain from '@Templates/TemplateMain';
import PageShowRoom from '@Pages/PageShowroom';

import mockMeta from './mockMeta';

const RouteCategory: FC = () => {
  return (
    <TemplateMain meta={mockMeta as MetaData}>
      <PageShowRoom />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
