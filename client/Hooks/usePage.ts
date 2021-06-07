import { useContext } from 'react';

import { getDataContext } from '@Contexts/Data/DataContext';
import { PageName } from '@Types/Base';

export default (): PageName => {
  const { body } = useContext(getDataContext());

  return body?.page;
};
