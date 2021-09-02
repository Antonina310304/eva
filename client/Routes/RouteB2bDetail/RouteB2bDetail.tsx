import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PageB2bDetail from '@Pages/PageB2bDetail';

const RouteWarranty: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });

  if (!page.isSuccess) return null;

  return (
    <TemplateMain>
      <PageB2bDetail page={page.data as any} />
    </TemplateMain>
  );
};

export default memo(RouteWarranty);
