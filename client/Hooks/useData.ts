import { useContext } from 'react';

import { getDataContext } from '@Contexts/Data/DataContext';

export default function useData<T>(): T {
  const { body } = useContext(getDataContext());

  return body?.data || {};
}
