import React, { FC, memo } from 'react';
import { Route as BaseRoute, RouteProps as BaseRouteProps } from 'react-router-dom';

import { Api } from '@Api/index';
import useRequest from '@Hooks/useRequest';
import useMeta from '@Queries/useMeta';

export interface RouteProps extends BaseRouteProps {
  regional?: boolean;
}

const Initiator: FC = () => {
  const meta = useMeta({ ssr: true });

  Api.setServices(meta.data?.services);

  return null;
};

const Route: FC<RouteProps> = (props) => {
  const { path, exact = true, regional = true, children, ...restProps } = props;
  const paths = [path, regional && `/:region${path}`].filter(Boolean) as string[];
  const request = useRequest();

  Api.setRequest(request);

  return (
    <BaseRoute {...restProps} exact={exact} path={paths}>
      <Initiator />
      {children}
    </BaseRoute>
  );
};

export default memo(Route);
