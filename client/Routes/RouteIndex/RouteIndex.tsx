import React, { FC, memo } from 'react';

import TemplateMain from '@Templates/TemplateMain';
import PageIndex from '@Pages/PageIndex';

const RouteCategory: FC = () => {
  return (
    <TemplateMain>
      <PageIndex />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
