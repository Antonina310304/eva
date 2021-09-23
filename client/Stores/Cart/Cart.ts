import { useQuery, useQueryClient } from 'react-query';
import { createDerived, createStore, getValue, update } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';
import equal from 'fast-deep-equal';

import * as ApiCart from '@Api/Cart';
import * as ApiOrder from '@Api/Order';
import logger from '@Utils/logger';
import { CartPositionData, CartProductData } from '@Types/Cart';
import { CartStoreValue, UseCart } from './typings';

const cartStore = createStore<CartStoreValue>();

// Все товары
const allProductsStore = createDerived(cartStore, (cart) => {
  let result: CartProductData[] = [];

  if (!cart?.positions) return [];

  cart.positions.forEach((position) => {
    result = result.concat(position.products);
  });

  return result;
});

// Товар есть в корзине?
const hasInCart = (productId: number): boolean => {
  const allProducts = getValue(allProductsStore);

  return !!allProducts.find((product) => product.id === productId);
};

// Найти позицию по идентификатору
const findPositionById = (id: string): CartPositionData => {
  const cart = getValue(cartStore);
  const positions = [...cart.removedPositions, ...cart.positions];

  return positions.find((position) => position.id === id);
};

// Найти позицию в корзине по идентификатору товара
const findPositionByProductId = (productId: number): CartPositionData => {
  const cart = getValue(cartStore);
  const positions = [...cart.removedPositions, ...cart.positions];
  let result = null;

  positions.forEach((position) => {
    position.products.forEach((product) => {
      if (product.id === productId) result = position;
    });
  });

  return result;
};

// Найти полную информацию о товаре по id
const findProductById = (productId: number): CartProductData => {
  const allProducts = getValue(allProductsStore);

  return allProducts.find((product) => product.id === productId);
};

// Получить основную информацию о корзине
const loadInitData = async () => {
  if (getValue(cartStore)) return;

  const { cart, deliveryTypes } = await ApiCart.info();

  cartStore.set({ ...cart, deliveryTypes });
};

// Добавить товары в корзину
const addProducts = async (inputsParams: any[], options: any = {}): Promise<void> => {
  const body: any[] = [];

  inputsParams.forEach((inputParams) => {
    if (inputParams.kitId) {
      body.push(inputParams);
    } else {
      const resultParams = {
        ...inputParams,
        isModular: inputParams.data ? inputParams.data.isModular : false,
      };

      if (inputParams.parameterValues?.length > 0) {
        resultParams.parameterValues = inputParams.parameterValues;
      }

      body.push(resultParams);
    }
  });

  try {
    const res = await ApiCart.put({ body });

    update(cartStore, (prevCart) => ({
      ...prevCart,
      ...res.cart,
      newPositions: options.isRelated ? prevCart.newPositions : res.cart.newPositions,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

// Удалить товар из корзины
const removeProduct = async (params: any, options: any = {}) => {
  const cart = getValue(cartStore);
  const position = findPositionByProductId(params.shopProductId);

  try {
    const response = await ApiCart.remove({ cartPositionId: position.id });
    const newPositions = options.isRelated ? cart.newPositions : response.cart.newPositions;
    const result = { ...cart, ...response.cart, newPositions };

    cartStore.set(result);
  } catch (error) {
    logger(error);
  }
};

// Скрыть позицию
const hidePosition = async ({ positionId }: { positionId: string }) => {
  try {
    const { cart } = await ApiCart.hide({
      cartPositionId: positionId,
    });

    update(cartStore, (prevCart) => ({
      ...prevCart,
      ...cart,
    }));
  } catch (err) {
    logger(err);
  }
};

// Показать позицию
const showPosition = async ({ positionId }: { positionId: string }) => {
  try {
    const { cart } = await ApiCart.unhide({
      cartPositionId: positionId,
    });

    const index = (cart.removedPositions as any[]).findIndex((item) => positionId === item.id);
    if (index !== -1) {
      const removedPositions = [...cart.removedPositions];
      removedPositions.splice(index, 1);

      cart.removedPositions = removedPositions;
    }

    update(cartStore, (prevCart) => ({
      ...prevCart,
      ...cart,
    }));
  } catch (err) {
    logger(err);
  }
};

// Изменить количество товаров для позиции
const changeCount = async (params: any) => {
  try {
    const response = await ApiCart.update(params);

    update(cartStore, (cart) => ({
      ...cart,
      ...response.cart,
      newPositions: cart.newPositions,
    }));
  } catch (err) {
    logger(err);
  }
};

// Загрузить сопутствующие товары
const loadRelatedProducts = async ({ productIds }: any): Promise<void> => {
  try {
    const response = await ApiCart.loadRelatedProducts({ productIds });
    const relatedProducts = (response.relatedProducts as any[]).map(
      ({ price, title, image, ...product }) => {
        const actual = Array.isArray(price) ? price[0] : price;
        const expired = Array.isArray(price) ? price[1] : price;
        const diff = expired - actual;
        const discount = Math.floor((diff * 100) / expired);

        return {
          ...product,
          images: [{ src: image }],
          name: title,
          price: { actual, expired, discount },
        };
      },
    );

    update(cartStore, (prevCart) => ({
      ...prevCart,
      relatedProducts,
      relatedTitle: response.title,
    }));
  } catch (error) {
    logger(error);
  }
};

// Обновить информацию о способе доставки
const updateDeliveryType = (id: number, newData: any): void => {
  update(cartStore, (oldCart) => ({
    ...oldCart,
    deliveryTypes: oldCart.deliveryTypes.map((deliveryType) => {
      if (deliveryType.id !== id) return deliveryType;

      return {
        ...deliveryType,
        ...newData,
      };
    }),
  }));
};

const init = (initialValue: CartStoreValue): void => {
  const value = getValue(cartStore);

  if (initialValue && !equal(initialValue, value)) {
    cartStore.set(initialValue);
  }
};

export const useCart: UseCart = (params) => {
  const { ssr = true } = params || {};
  const keys = ['cart', ssr && 'ssr'];

  const queryClient = useQueryClient();
  const result = useQuery(keys, () => ApiOrder.getCartInfo(), {
    enabled: ssr,
    keepPreviousData: true,
    retryOnMount: false,
    refetchOnMount: false,
  });

  if (result.data) {
    init(result.data);
  }

  // Sync nanostores with react-query store
  cartStore.listen((value) => {
    queryClient.setQueryData(keys, value);
  });

  return useStore(cartStore);
};

export default {
  init,
  addProducts,
  hasInCart,
  removeProduct,
  changeCount,
  hidePosition,
  showPosition,
  loadRelatedProducts,
  updateDeliveryType,
  loadInitData,
};
