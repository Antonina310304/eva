import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useProfile from '@Queries/useProfile';
import TemplateMain from '@Templates/TemplateMain';
import PageOrderCheck from '@Pages/PageOrderCheck';
import CartStore from '@Stores/Cart';

const RouteOrderCheck: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const profile = useProfile({ ssr: true });

  if (!page.isSuccess) return null;
  if (!profile.isIdle && !profile.isSuccess) return null;

  CartStore.init({
    ...page.data.cart,
    deliveryTypes: page.data.deliveryTypes,
    paymentTypes: page.data.paymentTypes,
    paymentVariants: page.data.paymentVariants,
  });

  return (
    <TemplateMain>
      <PageOrderCheck page={page.data as any} profile={profile.data} />
    </TemplateMain>
  );
};

export default memo(RouteOrderCheck);
