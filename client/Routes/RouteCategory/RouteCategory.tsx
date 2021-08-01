import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PageCategory from '@Pages/PageCategory';

const RouteCategory: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });

  if (!page.isSuccess) return null;

  return (
    <TemplateMain>
      <PageCategory page={page.data} key={pathname} />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
