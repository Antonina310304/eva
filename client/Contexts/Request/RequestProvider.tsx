import React, { FC } from 'react';

import RequestContext from './RequestContext';

export interface RequestProviderProps {
  cookie: string;
}

const RequestProvider: FC<RequestProviderProps> = (props) => {
  const { cookie, children } = props;

  return (
    <RequestContext.Consumer>
      {(context) => (
        <RequestContext.Provider value={{ ...context, cookie }}>{children}</RequestContext.Provider>
      )}
    </RequestContext.Consumer>
  );
};

export default RequestProvider;
