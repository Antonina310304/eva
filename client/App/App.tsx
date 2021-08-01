import React, { FC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';

import { Api } from '@Api/index';
import useRequest from '@Hooks/useRequest';
import ModalsProvider from '@Contexts/Modals/ModalsProvider';
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

const App: FC = () => {
  const request = useRequest();

  Api.setRequest(request);

  return (
    <ModalsProvider>
      <Switch>
        <Route exact path='/'>
          <RouteIndex />
        </Route>

        <Route exact path='/category/:slug'>
          <RouteCategory />
        </Route>

        <Route exact path='/product/:slug'>
          <RouteProduct />
        </Route>
      </Switch>
    </ModalsProvider>
  );
};

export default App;
