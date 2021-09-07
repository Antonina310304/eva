import { useQuery, UseQueryResult } from 'react-query';

import { ApiOrder } from '@Api/Order';

export interface Params {
  productIds?: number[];
  ssr?: boolean;
  enabled?: boolean;
}

export interface Result {
  earnedAmount: number;
  extraBonus?: boolean;
}

const useOrderBonuses = (params: Params): UseQueryResult<Result> => {
  const { ssr, productIds = [], enabled } = params;
  const keys = ['order-bonuses', ssr && 'ssr', ...productIds].filter(Boolean);

  return useQuery(keys, () => ApiOrder.getBonuses({ productIds }), {
    enabled,
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useOrderBonuses;
