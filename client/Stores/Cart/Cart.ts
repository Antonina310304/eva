import { createDerived, createStore, getValue, update } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

import { ApiCart } from '@Api/Cart';
import { CartPositionData, CartProductData } from '@Types/Cart';
import { NetworkStatus } from '@Types/Base';
import { CartStoreValue, UseCart } from './typings';

const cartStore = createStore<CartStoreValue>();
const networkStore = createStore<NetworkStatus>();

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
  networkStore.set('loading');

  try {
    const { cart, deliveryTypes } = await ApiCart.info();

    cartStore.set({ ...cart, deliveryTypes });
    networkStore.set('success');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);

    networkStore.set('error');
  }
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
    if (!options.isRelated) {
      networkStore.set('loading');
    }

    const res = await ApiCart.put({ body });

    update(cartStore, (prevCart) => ({
      ...prevCart,
      ...res.cart,
      newPositions: options.isRelated ? prevCart.newPositions : res.cart.newPositions,
    }));
    networkStore.set('success');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    networkStore.set('error');
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
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

// Скрыть позицию
const hidePosition = async ({ positionId }: { positionId: string }) => {
  try {
    const { cart } = await ApiCart.hide({
      cartPositionId: positionId,
    });

    cartStore.set(cart);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
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

    cartStore.set(cart);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
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
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

// Загрузить сопутствующие товары
const loadRelatedProducts = async ({ productIds }: any) => {
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
    // eslint-disable-next-line no-console
    console.error(error);

    // updateData({
    //   processing: false,
    //   error,
    // });
  }
};

// Обновить информацию о способе доставки
const updateDeliveryType = (id: number, newData: any) => {
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

export const useCart: UseCart = (initialData) => {
  if (initialData && !getValue(cartStore)) {
    cartStore.set(initialData);
    networkStore.set('success');
  }

  return {
    ...useStore(cartStore),
    network: useStore(networkStore),
  };
};

export default {
  addProducts,
  hasInCart,
  removeProduct,
  changeCount,
  hidePosition,
  showPosition,
  loadRelatedProducts,
  updateDeliveryType,
};
