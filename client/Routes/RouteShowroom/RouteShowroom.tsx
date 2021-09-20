import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import TemplateMain from '@Templates/TemplateMain';
import PageShowRoom, { PageShowroomData } from '@Pages/PageShowroom';

const RouteCategory: FC = () => {
  const { pathname } = useLocation();
  const page = usePage<PageShowroomData>({ path: pathname });
  const meta = useMeta();

  if (!page.isSuccess || !meta.isSuccess) return null;

  return (
    <TemplateMain meta={meta.data}>
      <PageShowRoom page={page.data} meta={meta.data} />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
