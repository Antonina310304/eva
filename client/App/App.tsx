import { FC } from 'react';
import loadable from '@loadable/component';

import ModalsProvider from '@Contexts/Modals/ModalsProvider';
import Route from '@Navigation/Route';
import routes from '@Navigation/routes';
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
const RouteB2bDetail = loadable(() => import('@Routes/RouteB2bDetail'));
const RouteTextileSamples = loadable(() => import('@Routes/RouteTextileSamples'));
const RoutePress = loadable(() => import('@Routes/RoutePress'));
const RouteSiteMap = loadable(() => import('@Routes/RouteSiteMap'));
const RouteSiteMapFull = loadable(() => import('@Routes/RouteSiteMapFull'));
const RouteShowroom = loadable(() => import('@Routes/RouteShowroom'));

const App: FC = () => {
  return (
    <ModalsProvider>
      <Route {...routes.index}>
        <RouteIndex />
      </Route>

      <Route {...routes.category}>
        <RouteCategory />
      </Route>

      <Route {...routes.product}>
        <RouteProduct />
      </Route>

      <Route {...routes.payment}>
        <RoutePayment />
      </Route>

      <Route {...routes.credit}>
        <RouteCredit />
      </Route>

      <Route {...routes.warranty}>
        <RouteWarranty />
      </Route>

      <Route {...routes.b2b}>
        <RouteB2b />
      </Route>

      <Route {...routes.qualityDepartment}>
        <RouteQualityDepartment />
      </Route>

      <Route {...routes.contacts}>
        <RouteContacts />
      </Route>

      <Route {...routes.delivery}>
        <RouteDelivery />
      </Route>

      <Route {...routes.siteFabrics}>
        <RouteTextileSamples />
      </Route>

      <Route {...routes.privacyPolicy}>
        <RoutePrivacyPolicy />
      </Route>

      <Route {...routes.oferta}>
        <RouteOferta />
      </Route>

      <Route {...routes.orderStatus}>
        <RouteOrderStatus />
      </Route>

      <Route {...routes.orderCheck}>
        <RouteOrderCheck />
      </Route>

      <Route {...routes.b2bDetail}>
        <RouteB2bDetail />
      </Route>

      <Route {...routes.press}>
        <RoutePress />
      </Route>

      <Route {...routes.siteMap}>
        <RouteSiteMap />
      </Route>

      <Route {...routes.siteMapFull}>
        <RouteSiteMapFull />
      </Route>

      <Route {...routes.showroom}>
        <RouteShowroom />
      </Route>
    </ModalsProvider>
  );
};

export default App;
