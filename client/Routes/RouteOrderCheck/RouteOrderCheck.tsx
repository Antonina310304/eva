import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PageOrderCheck from '@Pages/PageOrderCheck';

const RouteOrderCheck: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });

  if (!page.isSuccess) return null;

  return (
    <TemplateMain>
      <PageOrderCheck page={page.data as any} />
    </TemplateMain>
  );
};

export default memo(RouteOrderCheck);
