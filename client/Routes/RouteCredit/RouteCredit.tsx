import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageCredit from '@Pages/PageCredit';

const RouteCredit: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain>
      <PageCredit page={page.data} meta={meta.data} key={pathname} />
    </TemplateMain>
  );
};

export default memo(RouteCredit);
