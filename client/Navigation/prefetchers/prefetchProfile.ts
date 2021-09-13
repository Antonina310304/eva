import * as ApiProfile from '@Api/Profile';
import { QueryClient } from 'react-query';

export default async (_route: any, client: QueryClient): Promise<void> => {
  const keys = ['profile', 'ssr'];

  await client.prefetchQuery(keys, () => ApiProfile.fetchProfile());
};
