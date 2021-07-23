import { useQuery, UseQueryResult } from 'react-query';

import { Api } from '@Api/index';
import { ApiOrder } from '@Api/Order';
import useRequest from '@Hooks/useRequest';

export interface Params {
  productIds: number[];
  ssr?: boolean;
}

export interface Result {
  earnedAmount: number;
  extraBonus?: boolean;
}

const useOrderBonuses = (params: Params): UseQueryResult<Result> => {
  const request = useRequest();
  const { ssr, productIds } = params;
  const keys = ['order-bonuses', ...productIds];

  if (ssr) keys.push('ssr');

  return useQuery(
    keys,
    () => {
      Api.setRequest(request);

      return ApiOrder.getBonuses({ productIds });
    },
    {
      retryOnMount: false,
      refetchOnMount: false,
    },
  );
};

export default useOrderBonuses;
