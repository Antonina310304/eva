import React, { FC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';

import ModalsProvider from '@Contexts/Modals/ModalsProvider';
import ProductModel from '@Components/ProductModel';
import '@UI/fonts.module.css';
import '@UI/vars.module.css';
import './App.css';

export interface Data {
  page: string;
  productId: number;
}

const PageIndex = loadable(() => import('@Pages/PageIndex'));
const PageCategory = loadable(() => import('@Pages/PageCategory'));
const PageProduct = loadable(() => import('@Pages/PageProduct'));
const TemplateMain = loadable(() => import('@Templates/TemplateMain'));

const App: FC = () => {
  return (
    <ModalsProvider>
      <Switch>
        <Route exact path='/'>
          <TemplateMain>
            {/* <PageIndex /> */}
            <div className='container'>
              <ProductModel height={329} />
            </div>
          </TemplateMain>
        </Route>

        <Route exact path='/category/:slug'>
          <TemplateMain>
            <PageCategory />
          </TemplateMain>
        </Route>

        <Route exact path='/product/:slug'>
          <TemplateMain>
            <PageProduct />
          </TemplateMain>
        </Route>
      </Switch>
    </ModalsProvider>
  );
};

export default App;
