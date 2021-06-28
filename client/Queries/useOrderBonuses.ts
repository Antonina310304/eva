import { useQuery, UseQueryResult } from 'react-query';

import { ApiOrder } from '@Api/Order';

export interface Params {
  productIds: number[];
  ssr?: boolean;
}

export interface Result {
  earnedAmount: number;
  extraBonus?: boolean;
}

const useOrderBonuses = (params: Params): UseQueryResult<Result> => {
  const { ssr } = params;
  const keys = ['order-bonuses'];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiOrder.getBonuses(params), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useOrderBonuses;
