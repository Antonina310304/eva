import { QueryClient } from 'react-query';

import prefetchPage from './prefetchPage';
import prefetchCart from './prefetchCart';

export default async (route: any, client: QueryClient): Promise<void> => {
  await Promise.all([prefetchPage(route, client), prefetchCart(route, client)]);
};
