import { QueryClient } from 'react-query';

import prefetchPage from './prefetchPage';
import prefetchProfile from './prefetchProfile';
import prefetchCart from './prefetchCart';

export default async (route: any, client: QueryClient): Promise<void> => {
  await Promise.all([
    prefetchPage(route, client),
    prefetchProfile(route, client),
    prefetchCart(route, client),
  ]);
};
