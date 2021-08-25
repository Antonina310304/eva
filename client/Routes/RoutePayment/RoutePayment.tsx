import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PagePayment from '@Pages/PagePayment';

const RoutePayment: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });

  if (!page.isSuccess) return null;

  return (
    <TemplateMain>
      <PagePayment page={page.data as any} />
    </TemplateMain>
  );
};

export default memo(RoutePayment);
