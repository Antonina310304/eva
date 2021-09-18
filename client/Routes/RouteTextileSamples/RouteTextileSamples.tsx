import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageTextileSamples from '@Pages/PageTextileSamples';

const RouteTextileSamples: FC = () => {
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain meta={meta.data}>
      <PageTextileSamples page={page.data as any} meta={meta.data} />
    </TemplateMain>
  );
};

export default memo(RouteTextileSamples);
