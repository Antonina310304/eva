import { createMap, createStore, update } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

import { ApiCart } from '@Api/Cart';
import { CartData } from '@Types/Cart';
import { NetworkStatus } from '@Types/Base';

const cartStore = createStore<CartData>();
const networkStore = createStore<NetworkStatus>(() => {
  networkStore.set('pending');
});

const addProduct = async (inputsParams: any[], options: any = {}) => {
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
    networkStore.set('loading');

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
  addProduct,
  loadRelatedProducts,
};
