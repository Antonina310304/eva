import * as ApiOrder from '@Api/Order';
import { QueryClient } from 'react-query';

export default async (_route: any, client: QueryClient): Promise<void> => {
  const keys = ['cart', 'ssr'];

  await client.prefetchQuery(keys, () => ApiOrder.getCartInfo());
};
