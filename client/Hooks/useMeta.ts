import { useContext } from 'react';

import { getDataContext } from '@Contexts/Data/DataContext';
import { MetaData } from '@Types/Meta';

export default (): MetaData => {
  const { body } = useContext(getDataContext());

  return body.meta;
};
