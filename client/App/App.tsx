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
const RoutePayment = loadable(() => import('@Routes/RoutePayment'));
const RouteCredit = loadable(() => import('@Routes/RouteCredit'));
const RouteWarranty = loadable(() => import('@Routes/RouteWarranty'));
const RouteB2b = loadable(() => import('@Routes/RouteB2b'));
const RouteDelivery = loadable(() => import('@Routes/RouteDelivery'));
const RouteQualityDepartment = loadable(() => import('@Routes/RouteQualityDepartment'));
const RouteContacts = loadable(() => import('@Routes/RouteContacts'));
const RoutePrivacyPolicy = loadable(() => import('@Routes/RoutePrivacyPolicy'));
const RouteOferta = loadable(() => import('@Routes/RouteOferta'));
const RouteOrderStatus = loadable(() => import('@Routes/RouteOrderStatus'));
const RouteOrderCheck = loadable(() => import('@Routes/RouteOrderCheck'));

const App: FC = () => {
  return (
    <ModalsProvider>
      <Route regional={false} path='/'>
        <RouteIndex />
      </Route>

      <Route path='/category/:slug'>
        <RouteCategory />
      </Route>

      <Route path='/product/:slug'>
        <RouteProduct />
      </Route>

      <Route path='/site/payment'>
        <RoutePayment />
      </Route>

      <Route exact path='/site/credit'>
        <RouteCredit />
      </Route>

      <Route path='/site/warranty'>
        <RouteWarranty />
      </Route>

      <Route path='/b2b'>
        <RouteB2b />
      </Route>

      <Route path='/site/quality-department'>
        <RouteQualityDepartment />
      </Route>

      <Route path='/site/contacts'>
        <RouteContacts />
      </Route>

      <Route path='/site/delivery'>
        <RouteDelivery />
      </Route>

      <Route path='/static-page/privacy-policy'>
        <RoutePrivacyPolicy />
      </Route>

      <Route path='/static-page/oferta'>
        <RouteOferta />
      </Route>

      <Route path='/order/status/:orderId'>
        <RouteOrderStatus />
      </Route>

      <Route path='/order/check'>
        <RouteOrderCheck />
      </Route>
    </ModalsProvider>
  );
};

export default App;
