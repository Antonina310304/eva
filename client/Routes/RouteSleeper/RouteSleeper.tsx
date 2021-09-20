import React, { FC, memo } from 'react';
import { MetaData } from '@Types/Meta';

import TemplateMain from '@Templates/TemplateMain';
import PageSleeper from '@Pages/PageSleeper';

import mockMeta from './mockMeta';

const RouteCategory: FC = () => {
  return (
    <TemplateMain meta={mockMeta as MetaData}>
      <PageSleeper />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
