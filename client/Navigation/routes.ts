export interface Route {
  regional?: boolean;
  path: string;
  exact?: boolean;
}

export interface RoutesMap {
  [key: string]: Route;
}

const routes: RoutesMap = {
  index: {
    regional: false,
    path: '/',
  },
  category: {
    path: '/category/:slug',
  },
  product: {
    path: '/product/:slug',
  },
  promotionsDiscounts: {
    path: '/akcii-skidki',
  },

  //
  orderCheck: {
    path: '/order/check',
  },
  orderStatus: {
    path: '/order/status/:orderId',
  },

  //
  payment: {
    path: '/site/payment',
  },
  credit: {
    path: '/site/credit',
  },
  warranty: {
    path: '/site/warranty',
  },
  delivery: {
    path: '/site/delivery',
  },
  qualityDepartment: {
    path: '/site/quality-department',
  },
  contacts: {
    path: '/site/contacts',
  },
  press: {
    path: '/site/press',
  },
  siteFabrics: {
    path: '/site/fabrics',
  },
  siteMap: {
    path: '/site/site-map',
  },
  siteMapFull: {
    path: '/site/site-map-full',
  },
  showroom: {
    path: '/site/showroom',
  },

  //
  privacyPolicy: {
    path: '/static-page/privacy-policy',
  },
  oferta: {
    path: '/static-page/oferta',
  },

  //
  b2b: {
    path: '/b2b',
  },
  b2bDetail: {
    path: '/b2b/detail/:slug',
  },

  //
  promoPrints: {
    path: '/promo/prints',
  },
};

export default routes;
