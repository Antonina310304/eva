import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import loadable from '@loadable/component';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';

const PagePaymentRus = loadable(() => import('@Pages/PagePaymentRus'));
const PagePaymentBlr = loadable(() => import('@Pages/PagePaymentBlr'));

const RoutePayment: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain>
      {meta.data.country === 'RUS' && <PagePaymentRus page={page.data} meta={meta.data} />}
      {meta.data.country === 'BLR' && <PagePaymentBlr page={page.data} meta={meta.data} />}
    </TemplateMain>
  );
};

export default memo(RoutePayment);
