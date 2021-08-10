import { ProductData } from '@Types/ProductData';

export interface Product {
  productId: string | number;
  quantity: number;
  price: number;
}

export interface AddToCartParams {
  productId: string | number;
  price: number;
}

export interface RemoveFromCartParams {
  productId: string | number;
  price: number;
}

export interface OrderParams {
  mobilePhone: string;
  address: string;
  firstName: string;
  email: string;
  order: {
    id: string;
    price: string;
    products: Product[];
  };
}

export interface OneClickOrderParams {
  mobilePhone: string;
  fullName: string;
  order: {
    id: string;
    price: number;
    products: Product[];
  };
}

export interface ImpressionListParams {
  name: string;
  products: ProductData[];
}

function transformProductId(id: any) {
  return id.toString();
}

function transformProduct(product: any): Product {
  return {
    ...product,
    productId: transformProductId(product.productId),
  };
}

function directCrm(...attrs: unknown[]): void {
  if (!window.directCrm) return;

  window.directCrm(...attrs);
}

function pushDataLayer(data: unknown): void {
  (window.dataLayer = window.dataLayer || []).push(data);
}

// Событие добавление товара в корзину
function addToCart({ productId, price }: AddToCartParams): void {
  directCrm('performOperation', {
    operation: 'DobavitTovarVVKorzina',
    data: {
      action: {
        productId: transformProductId(productId),
        price,
      },
    },
  });
}

// Отправка формы «Подписка по email»
function formEmailSubscriptionSend({ email }): void {
  directCrm('identify', {
    operation: 'SubscribeFour',
    identificator: {
      provider: 'email',
      identity: email,
    },
    data: {},
  });
}

// Отправка формы «Заказать звонок»
function formCallMeSend({ name, phone }): void {
  directCrm('identify', {
    operation: 'CallMe',
    identificator: {
      provider: 'mobilePhone',
      identity: phone,
    },
    data: {
      fullName: name,
    },
  });
}

// Открыли конструктор
function openConstructor({ productType }): void {
  directCrm('performOperation', {
    operation: 'Constructor',
  });
  pushDataLayer({
    eCategory: 'lego',
    eAction: 'open',
    eLabel: productType,
    eNI: false,
    event: 'GAEvent',
  });
}

export default {
  directCrm,
  pushDataLayer,
  addToCart,
  openConstructor,
  formEmailSubscriptionSend,
  formCallMeSend,
};
