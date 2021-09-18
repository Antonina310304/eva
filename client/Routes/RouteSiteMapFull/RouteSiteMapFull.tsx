import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageSiteMapFull from '@Pages/PageSiteMapFull';

const RouteSiteMapFull: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname });
  const meta = useMeta();

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain meta={meta.data}>
      <PageSiteMapFull page={page.data as any} meta={meta.data} />
    </TemplateMain>
  );
};

export default memo(RouteSiteMapFull);
