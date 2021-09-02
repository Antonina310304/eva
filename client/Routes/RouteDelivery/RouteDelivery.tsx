import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import TemplateMain from '@Templates/TemplateMain';
import PageDelivery from '@Pages/PageDelivery';
import useMeta from '@Queries/useMeta';

const RouteDelivery: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain>
      <PageDelivery page={page.data} meta={meta.data} />
    </TemplateMain>
  );
};

export default memo(RouteDelivery);
