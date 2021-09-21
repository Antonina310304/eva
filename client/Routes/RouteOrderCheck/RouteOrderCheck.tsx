import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useProfile from '@Queries/useProfile';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageOrderCheck, { PageOrderCheckData } from '@Pages/PageOrderCheck';
import { useCart } from '@Stores/Cart';
import OrderFormStore from '@Stores/OrderForm';

const RouteOrderCheck: FC = () => {
  const { pathname } = useLocation();
  const page = usePage<PageOrderCheckData>({ path: pathname });
  const meta = useMeta();
  const cart = useCart();
  const profile = useProfile({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;
  if (!profile.isSuccess || !cart) return null;

  OrderFormStore.init({
    ...cart,
    deliveryTypes: page.data.deliveryTypes,
    paymentTypes: page.data.paymentTypes,
    paymentVariants: page.data.paymentVariants,
  });

  return (
    <TemplateMain meta={meta.data}>
      <PageOrderCheck page={page.data} profile={profile.data} />
    </TemplateMain>
  );
};

export default memo(RouteOrderCheck);
