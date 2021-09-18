import { FC } from 'react';

import RequestContext from './RequestContext';

export interface RequestProviderProps {
  origin: string;
  cookie: string;
}

const RequestProvider: FC<RequestProviderProps> = (props) => {
  const { origin, cookie, children } = props;

  return (
    <RequestContext.Consumer>
      {(context) => (
        <RequestContext.Provider value={{ ...context, origin, cookie }}>
          {children}
        </RequestContext.Provider>
      )}
    </RequestContext.Consumer>
  );
};

export default RequestProvider;
