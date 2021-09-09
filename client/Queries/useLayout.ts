import { useQuery, UseQueryResult } from 'react-query';

import * as ApiPages from '@Api/Pages';
import { Layout } from '@Types/Layout';

export interface Params {
  path: string;
  ssr?: boolean;
}

// TODO: сейчас мы вытаскиваем данные из запроса страницы, но в будущем для этого нужно сделать отдельный запроос,
// который будет отдавать только нужные данные
const useLayout = (params: Params): UseQueryResult<Layout> => {
  const { path, ssr } = params;
  const keys = ['layout', ssr && 'ssr', path];

  const result = useQuery(
    keys,
    async () => {
      const page = await ApiPages.fetchPage({ path });

      return page.layout;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: false,
    },
  );

  return result;
};

export default useLayout;
