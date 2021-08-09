import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageWarranty from '@Pages/PageWarranty';

const RouteWarranty: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain>
      <PageWarranty page={page.data} meta={meta.data} />
    </TemplateMain>
  );
};

export default memo(RouteWarranty);
