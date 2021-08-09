import React, { FC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';

import ModalsProvider from '@Contexts/Modals/ModalsProvider';
import ApiSetup from '@Components/ApiSetup';
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
const RoutePayment = loadable(() => import('@Routes/RoutePayment'));

const App: FC = () => {
  return (
    <ModalsProvider>
      <Switch>
        <Route exact path='/'>
          <RouteIndex />
        </Route>

        <Route exact path='/category/:slug'>
          <ApiSetup>
            <RouteCategory />
          </ApiSetup>
        </Route>

        <Route exact path='/:region/category/:slug'>
          <ApiSetup>
            <RouteCategory />
          </ApiSetup>
        </Route>

        <Route exact path='/product/:slug'>
          <ApiSetup>
            <RouteProduct />
          </ApiSetup>
        </Route>

        <Route exact path='/:region/product/:slug'>
          <ApiSetup>
            <RouteProduct />
          </ApiSetup>
        </Route>

        <Route exact path='/site/payment'>
          <ApiSetup>
            <RoutePayment />
          </ApiSetup>
        </Route>

        <Route exact path='/:region/site/payment'>
          <ApiSetup>
            <RoutePayment />
          </ApiSetup>
        </Route>
      </Switch>
    </ModalsProvider>
  );
};

export default App;
