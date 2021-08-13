import { createStore, getValue, createDerived, update } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

import { RelatedProductsListData } from '@Types/RelatedProducts';

export interface ChangeQuantityProductParams {
  listId: number;
  productId: number;
  quantity: number;
}

export interface RelatedProductsValue {
  productId: number;
  lists: RelatedProductsListData[];
}

export type UseRelatedProducts = (
  initialValue?: RelatedProductsValue,
) => {
  allLists: RelatedProductsListData[];
  selectedLists: RelatedProductsListData[];
};

export type ChangeQuantityProduct = (params: ChangeQuantityProductParams) => void;

const store = createStore<RelatedProductsValue>();

const selectedLists = createDerived(store, ({ lists }) => {
  return lists.map((item) => ({
    ...item,
    products: item.products.filter((product) => product.quantity > 0),
  }));
});

const changeQuantityProduct: ChangeQuantityProduct = ({ listId, productId, quantity }) => {
  update(store, (value) => ({
    ...value,
    lists: value.lists.map((list) => {
      if (list.id !== listId) return list;

      const newProducts = list.products.map((product) => {
        if (product.id !== productId) return product;

        return { ...product, quantity };
      });

      return {
        ...list,
        products: newProducts,
      };
    }),
  }));
};

export const useRelatedProducts: UseRelatedProducts = (initialValue) => {
  const value = getValue(store);

  if (initialValue && value?.productId !== initialValue?.productId) {
    store.set(initialValue);
  }

  return {
    allLists: useStore(store).lists,
    selectedLists: useStore(selectedLists),
  };
};

export default {
  changeQuantityProduct,
};
