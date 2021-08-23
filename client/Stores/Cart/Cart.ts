import { createDerived, createStore, getValue, update } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

import { ApiCart } from '@Api/Cart';
import { CartData, CartPositionData, CartProductData } from '@Types/Cart';
import { NetworkStatus } from '@Types/Base';

const cartStore = createStore<CartData>();

const networkStore = createStore<NetworkStatus>(() => {
  networkStore.set('pending');
});

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
    const index = cart.removedPositions.findIndex((item) => position.id === item.id);

    if (index !== -1) {
      const removedPositions = [...cart.removedPositions];
      removedPositions.splice(index, 1);

      result.removedPositions = removedPositions;
    }

    cartStore.set(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
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

export const useCart = () => {
  return {
    ...useStore(cartStore),
    network: useStore(networkStore),
  };
};

export default {
  addProducts,
  hasInCart,
  removeProduct,
  loadRelatedProducts,
};
