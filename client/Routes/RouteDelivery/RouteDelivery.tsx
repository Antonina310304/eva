import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import { useCart } from '@Stores/Cart';
import TemplateMain from '@Templates/TemplateMain';
import PageDelivery from '@Pages/PageDelivery';

const RouteDelivery: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname });
  const cart = useCart();
  const meta = useMeta();

  if (!page.isSuccess || !meta.isSuccess || !cart) return null;

  return (
    <TemplateMain hideDeliveryInfo meta={meta.data}>
      <PageDelivery page={page.data} meta={meta.data} cart={cart} />
    </TemplateMain>
  );
};

export default memo(RouteDelivery);
