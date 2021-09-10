import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PageB2bDetail from '@Pages/PageB2bDetail';
import useMeta from '@Queries/useMeta';

const RouteWarranty: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain meta={meta.data}>
      <PageB2bDetail page={page.data as any} />
    </TemplateMain>
  );
};

export default memo(RouteWarranty);
