import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate, hydrate as hydrateState } from 'react-query/hydration';
import RequestProvider from '@Contexts/Request/RequestProvider';

import App from '@App';
import loadSentry from './loadSentry';

loadableReady(async () => {
  const config = window.__CONFIG__;
  const state = window.__SERVER_STATE__;
  const isDev = config.env === 'development';
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(state);
  }

  hydrateState(queryClient, state);
  hydrate(
    <BrowserRouter>
      <RequestProvider origin={window.location.origin} cookie={document.cookie}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={state}>
            <App />
          </Hydrate>
        </QueryClientProvider>
      </RequestProvider>
    </BrowserRouter>,
    document.getElementById('root'),
  );

  if (!isDev) {
    loadSentry(config);
  }
});

if (module.hot) {
  module.hot.accept();
}
