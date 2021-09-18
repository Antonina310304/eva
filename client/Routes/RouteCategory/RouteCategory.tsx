import { FC, memo, useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import TemplateMain from '@Templates/TemplateMain';
import PageCategory from '@Pages/PageCategory';
import FiltratorStore from '@Stores/Filtrator';
import useInfiniteCategory from '@Queries/useInfiniteCategory';
import useMeta from '@Queries/useMeta';
import usePage from '@Queries/usePage';

export interface RouteParams {
  slug: string;
}

const RouteCategory: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { slug } = useParams<RouteParams>();
  const path = `${location.pathname}${location.search}`;
  const page = usePage({ path });
  const category = useInfiniteCategory({ slug, search: location.search });
  const meta = useMeta();

  const handleApplyFilters = useCallback(
    (url) => {
      history.push(`${location.pathname}${url}`);
    },
    [history, location.pathname],
  );

  const handleMore = useCallback(() => {
    if (category.isFetching || !category.hasNextPage) return;

    category.fetchNextPage();
  }, [category]);

  if (!page.isSuccess || !category.isSuccess || !meta.isSuccess) return null;

  FiltratorStore.init({
    id: `${path}${page.data.categoryTranslite}`,
    ...category.data.pages[0].filters,
  });

  return (
    <TemplateMain meta={meta.data}>
      <PageCategory
        page={page.data}
        category={category}
        slug={slug}
        path={path}
        onApplyFilters={handleApplyFilters}
        onMore={handleMore}
      />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
