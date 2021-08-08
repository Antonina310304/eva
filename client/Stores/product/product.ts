import { createStore, getValue } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

import { ApiProduct } from '@Api/Product';
import { ModuleProductData } from '@Types/ModuleProduct';
import { ProductData } from '@Types/Product';
import { NetworkStatus } from '@Types/Base';

export interface Value extends ProductData {
  networkStatus: NetworkStatus;
  modules: ModuleProductData[];
}

export interface Result extends Value {
  editModule: any;
}

export type UseProduct = (initialValue?: Value) => Result;

const productStore = createStore<Value>();
const networkStore = createStore<NetworkStatus>();

const getParameterValues = () => {
  const product = getValue(productStore);

  return product.modules
    .filter((module) => module.count > 0)
    .map((module) => ({
      id: module.parameterId,
      count: module.count,
    }));
};

const updateProduct = async () => {
  const product = getValue(productStore);
  const parameterValues = getParameterValues();
  const params = { shopProductId: product.id, parameterValues };

  try {
    networkStore.set('loading');

    const res = await ApiProduct.getInfoByParams(params);

    if (product.modules?.length > 0) {
      productStore.set({
        ...product,
        price: { ...product.price, actual: res.price.value },
      });
    } else {
      const oldPrice = product.price;
      const oldPriceCoefficient =
        oldPrice.actual && oldPrice.expired ? oldPrice.actual / oldPrice.expired : null;
      const expired = oldPriceCoefficient
        ? Math.ceil(res.price.value / oldPriceCoefficient / 100) * 100 - 10
        : 0;
      const discount = oldPriceCoefficient ? Math.round((1 - res.price.value / expired) * 100) : 0;

      productStore.set({
        ...product,
        price: { ...product.price, expired, actual: res.price.value, discount },
      });
    }

    networkStore.set('success');
  } catch (err) {
    networkStore.set('error');
  }
};

const editModule = (module: ModuleProductData) => {
  const product = getValue(productStore);
  const network = getValue(networkStore);

  if (network === 'loading') return;

  productStore.set({
    ...product,
    modules: product.modules.map((prevModule) => {
      return prevModule.id === module.id ? module : prevModule;
    }),
  });

  updateProduct();
};

export const useProduct: UseProduct = (initialValue) => {
  const product = getValue(productStore);

  if (initialValue && product?.id !== initialValue?.id) {
    productStore.set(initialValue);
  }

  return {
    ...useStore(productStore),
    networkStatus: useStore(networkStore),
    editModule,
  };
};
