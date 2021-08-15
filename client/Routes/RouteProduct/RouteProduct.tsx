import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageProduct from '@Pages/PageProduct';
import { usePageProduct } from '@Stores/PageProduct';

const RouteProduct: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });
  const pageProduct = usePageProduct(page.data);

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain>
      <PageProduct page={pageProduct} meta={meta.data} key={page.data.product.id} />
    </TemplateMain>
  );
};

export default memo(RouteProduct);
