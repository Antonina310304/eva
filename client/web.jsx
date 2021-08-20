import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate, hydrate as hydrateState } from 'react-query/hydration';
import RequestProvider from '@Contexts/Request/RequestProvider';

import App from '@App';

const isDev = process.env.NODE_ENV === 'development';

loadableReady(() => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const state = window.__SERVER_STATE__;

  // eslint-disable-next-line no-console
  if (isDev) {
    console.log(state);
  }

  hydrateState(queryClient, state);
  hydrate(
    <RequestProvider origin={window.location.origin} cookie={document.cookie}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={state}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Hydrate>
      </QueryClientProvider>
    </RequestProvider>,
    document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}
