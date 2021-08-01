import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageProduct from '@Pages/PageProduct';

const RouteProduct: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain>
      <PageProduct page={page.data} meta={meta.data} key={page.data.product.id} />
    </TemplateMain>
  );
};

export default memo(RouteProduct);
