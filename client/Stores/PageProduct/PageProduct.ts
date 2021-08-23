import { createStore, getValue, update } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

import { ApiProduct } from '@Api/Product';
import { ModuleProductData } from '@Types/ModuleProduct';
import { ProductData } from '@Types/Product';
import { NetworkStatus } from '@Types/Base';

export interface Value {
  networkStatus?: NetworkStatus;
  modules: ModuleProductData[];
  parameters: any[];
  importantParameters: any[];
  product: ProductData;
}

export type UsePageProduct = (initialValue?: Value) => Value;

const pageStore = createStore<Value>();
const networkStore = createStore<NetworkStatus>();

const getParameterValues = () => {
  const page = getValue(pageStore);
  const result: { id: number; count: number }[] = [];

  page.modules.forEach((module) => {
    result.push({
      id: module.parameterId,
      count: module.count,
    });
  });

  page.parameters.forEach((parameter) => {
    (parameter.variants || []).forEach((variant: any) => {
      if (variant.selected) result.push({ id: variant.id, count: 1 });
    });
  });

  return result;
};

const updatePageProduct = async () => {
  const page = getValue(pageStore);
  const parameterValues = getParameterValues();
  const params = { shopProductId: page.product.id, parameterValues };

  try {
    networkStore.set('loading');

    const res = await ApiProduct.getInfoByParams(params);
    let price = {};

    if (page.modules?.length > 0) {
      price = { actual: res.price.value };
    } else {
      const oldPrice = page.product.price;
      const oldPriceCoefficient =
        oldPrice.actual && oldPrice.expired ? oldPrice.actual / oldPrice.expired : null;
      const expired = oldPriceCoefficient
        ? Math.ceil(res.price.value / oldPriceCoefficient / 100) * 100 - 10
        : 0;
      const discount = oldPriceCoefficient ? Math.round((1 - res.price.value / expired) * 100) : 0;

      price = { expired, actual: res.price.value, discount };
    }

    update(pageStore, (prev) => ({
      ...prev,
      product: {
        ...page.product,
        price: { ...prev.product.price, ...price },
      },
      importantParameters: res.importantParameters || prev.importantParameters,
    }));

    networkStore.set('success');
  } catch (err) {
    networkStore.set('error');
  }
};

const editModule = (module: ModuleProductData): void => {
  const network = getValue(networkStore);

  if (network === 'loading') return;

  update(pageStore, (page) => ({
    ...page,
    modules: page.modules.map((prevModule) => {
      return prevModule.id === module.id ? module : prevModule;
    }),
  }));

  updatePageProduct();
};

const selectParameter = ({ groupId, variantId }: any): void => {
  update(pageStore, (page) => ({
    ...page,
    parameters: page.parameters.map((parameter: any) => {
      if (parameter.groupId !== groupId) return parameter;

      return {
        ...parameter,
        variants: parameter.variants.map((variant: any) => ({
          ...variant,
          selected: variant.id === variantId,
        })),
      };
    }),
  }));

  updatePageProduct();
};

export const usePageProduct: UsePageProduct = (initialValue) => {
  const page = getValue(pageStore);

  if (initialValue && page?.product.id !== initialValue?.product.id) {
    pageStore.set(initialValue);
  }

  return {
    ...useStore(pageStore),
    networkStatus: useStore(networkStore),
  };
};

export default {
  editModule,
  getParameterValues,
  selectParameter,
};
