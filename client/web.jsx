import 'intersection-observer';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

import App from '@App';
import DataProvider from '@Contexts/Data/DataProvider';

const isDev = process.env.NODE_ENV === 'development';

loadableReady(() => {
  const body = window.__SERVER_STATE__;

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(body);
  }

  hydrate(
    <DataProvider body={body}>
      <App />
    </DataProvider>,
    document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}
