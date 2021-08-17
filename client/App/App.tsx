import React, { FC } from 'react';
import loadable from '@loadable/component';

import ModalsProvider from '@Contexts/Modals/ModalsProvider';
import Route from '@Components/Route';
import '@UI/fonts.module.css';
import '@UI/vars.module.css';
import './App.css';

export interface Data {
  page: string;
  productId: number;
}

const RouteIndex = loadable(() => import('@Routes/RouteIndex'));
const RouteCategory = loadable(() => import('@Routes/RouteCategory'));
const RouteProduct = loadable(() => import('@Routes/RouteProduct'));
const RouteWarranty = loadable(() => import('@Routes/RouteWarranty'));
const RouteContacts = loadable(() => import('@Routes/RouteContacts'));

const App: FC = () => {
  return (
    <ModalsProvider>
      <Route path='/'>
        <RouteIndex />
      </Route>

      <Route path='/category/:slug'>
        <RouteCategory />
      </Route>

      <Route path='/product/:slug'>
        <RouteProduct />
      </Route>

      <Route path='/site/warranty'>
        <RouteWarranty />
      </Route>

      <Route path='/site/contacts'>
        <RouteContacts />
      </Route>
    </ModalsProvider>
  );
};

export default App;
