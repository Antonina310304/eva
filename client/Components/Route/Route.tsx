import React, { FC, memo } from 'react';
import { Route as BaseRoute, RouteProps as BaseRouteProps } from 'react-router-dom';

import { Api } from '@Api/index';
import useRequest from '@Hooks/useRequest';
import useMeta from '@Queries/useMeta';

export interface RouteProps extends BaseRouteProps {
  regional?: boolean;
}

const Route: FC<RouteProps> = (props) => {
  const { path, exact = true, regional = true, ...restProps } = props;
  const paths = [path, regional && path !== '/' && `/:region${path}`].filter(Boolean) as string[];
  const request = useRequest();
  const meta = useMeta({ ssr: true });

  Api.setRequest(request);
  Api.setServices(meta.data?.services);

  return <BaseRoute {...restProps} exact={exact} path={paths} />;
};

export default memo(Route);
