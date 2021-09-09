import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import TemplateMain from '@Templates/TemplateMain';
import PageIndex from '@Pages/PageIndex';
import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';

const RouteCategory: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain meta={meta.data}>
      <PageIndex page={page.data as any} meta={meta.data} />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
