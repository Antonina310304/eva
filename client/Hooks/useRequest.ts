import { useContext } from 'react';

import RequestContext, { RequestState } from '@Contexts/Request/RequestContext';

function useRequest(): RequestState {
  const data = useContext(RequestContext);

  return data;
}

export default useRequest;
