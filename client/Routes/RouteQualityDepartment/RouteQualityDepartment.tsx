import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PageQualityDepartment from '@Pages/PageQualityDepartment';

const RouteQualityDepartment: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });

  return (
    <TemplateMain>
      <PageQualityDepartment page={page.data as any} />
    </TemplateMain>
  );
};

export default memo(RouteQualityDepartment);
