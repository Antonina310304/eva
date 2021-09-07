import React, { FC, memo } from 'react';
import {
  Route as BaseRoute,
  RouteProps as BaseRouteProps,
  useParams,
  Redirect,
  useLocation,
} from 'react-router-dom';

import { Api } from '@Api/index';
import useRequest from '@Hooks/useRequest';
import useMeta from '@Queries/useMeta';

export interface RouteProps extends BaseRouteProps {
  regional?: boolean;
}

export interface RouteParams {
  region?: string;
}

const Initiator: FC<any> = ({ children }) => {
  const meta = useMeta({ ssr: true });
  const { pathname } = useLocation();
  const { region } = useParams<RouteParams>();
  const regionUrl = region ? `/${region}` : '';

  Api.setServices(meta.data?.services);
  Api.setRegion(region);

  // Если регион из URL не совпадает с регионом из meta-информации,
  // то выполняем редирект на регион из meta-информации
  if (meta.data && regionUrl !== meta.data.region.url) {
    const chunks = pathname.split('/');
    const metaRegion = meta.data.region.url.slice(1);

    if (region) {
      chunks[1] = metaRegion;
    } else {
      chunks.splice(1, 0, metaRegion);
    }

    const url = chunks.filter(Boolean).join('/');

    console.log(chunks, 'url', url);

    return <Redirect to={`/${url}`} />;
  }

  return children;
};

const Route: FC<RouteProps> = (props) => {
  const { path, exact = true, regional = true, children, ...restProps } = props;
  const paths = [path, regional && `/:region${path}`].filter(Boolean) as string[];
  const request = useRequest();

  Api.setRequest(request);

  return (
    <BaseRoute {...restProps} exact={exact} path={paths}>
      <Initiator>{children}</Initiator>
    </BaseRoute>
  );
};

export default memo(Route);
