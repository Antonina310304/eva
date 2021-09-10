import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageQualityDepartment from '@Pages/PageQualityDepartment';

const RouteQualityDepartment: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname });
  const meta = useMeta();

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain meta={meta.data}>
      <PageQualityDepartment page={page.data as any} />
    </TemplateMain>
  );
};

export default memo(RouteQualityDepartment);
