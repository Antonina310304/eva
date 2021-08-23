import React, { FC, memo, useCallback, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import TemplateMain from '@Templates/TemplateMain';
import PageCategory from '@Pages/PageCategory';
import useInfiniteCategory from '@Queries/useInfiniteCategory';

export interface RouteParams {
  slug: string;
}

const RouteCategory: FC = () => {
  const { pathname, search } = useLocation();
  const { slug } = useParams<RouteParams>();
  const [path, setPath] = useState(`${pathname}${search}`);
  const { page, category } = useInfiniteCategory({ path });

  const handleApplyFilters = useCallback(
    (url) => {
      setPath(`${pathname}${url}`);
    },
    [pathname],
  );

  const handleMore = useCallback(() => {
    if (category.isFetching || !category.hasNextPage) return;

    category.fetchNextPage();
  }, [category]);

  useEffect(() => {
    setPath(`${pathname}${search}`);
  }, [pathname, search]);

  if (!page.isSuccess || !category.isSuccess) return null;

  return (
    <TemplateMain>
      <PageCategory
        page={page.data}
        category={category}
        slug={slug}
        path={`${pathname}${search}`}
        onApplyFilters={handleApplyFilters}
        onMore={handleMore}
      />
    </TemplateMain>
  );
};

export default memo(RouteCategory);
