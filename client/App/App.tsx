import React, { FC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';

import ModalsProvider from '@Contexts/Modals/ModalsProvider';
import useMeta from '@Hooks/useMeta';
import '@UI/fonts.module.css';
import '@UI/vars.module.css';
import './App.css';

export interface Data {
  page: string;
  productId: number;
}

const PageIndex = loadable(() => import('@Pages/PageIndex'));
const PageCategory = loadable(() => import('@Pages/PageCategory'));
const TemplateMain = loadable(() => import('@Templates/TemplateMain'));

const App: FC = () => {
  useMeta();

  return (
    <ModalsProvider>
      <Switch>
        <Route exact path='/'>
          <TemplateMain>
            <PageIndex />
          </TemplateMain>
        </Route>

        <Route exact path='/category/:slug'>
          <TemplateMain>
            <PageCategory />
          </TemplateMain>
        </Route>
      </Switch>
    </ModalsProvider>
  );
};

export default App;
