import React, { FC } from 'react';

import { Api } from '@Api/index';
import useRequest from '@Hooks/useRequest';
import useMeta from '@Queries/useMeta';

const ApiSetup: FC = ({ children }) => {
  const request = useRequest();
  const meta = useMeta({ ssr: true });

  Api.setRequest(request);
  Api.setServices(meta.data?.services);

  return <>{children}</>;
};

export default ApiSetup;
