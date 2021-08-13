import React, { FC, memo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PageCategory from '@Pages/PageCategory';

export interface RouteParams {
  slug: string;
}

const RouteCategory: FC = () => {
  const { pathname, search } = useLocation();
  const path = `${pathname}${search}`;
  const { slug } = useParams<RouteParams>();
  const page = usePage({ path, ssr: true });

  if (!page.isSuccess) return null;

  return (
    <TemplateMain>
      <PageCategory page={page.data} slug={slug} key={path} />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
