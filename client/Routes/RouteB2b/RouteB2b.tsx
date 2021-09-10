import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PageB2b from '@Pages/PageB2b';
import useMeta from '@Queries/useMeta';

const RouteB2b: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta();

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain meta={meta.data}>
      <PageB2b page={page.data as any} />
    </TemplateMain>
  );
};

export default memo(RouteB2b);
