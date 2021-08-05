import { createStore, getValue, createDerived } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

export interface ChangeQuantityProductParams {
  listId: number;
  productId: number;
  quantity: number;
}

export interface RelatedProductsStore {
  productId: number;
  lists: any[];
}

export type UseRelatedProducts = (initialValue?: RelatedProductsStore) => RelatedProductsStore;
export type ChangeQuantityProduct = (params: ChangeQuantityProductParams) => void;

const store = createStore<RelatedProductsStore>();

const selectedLists = createDerived(store, ({ lists }) => {
  return lists.map((item) => ({
    ...item,
    products: item.products.filter((product: any) => product.quantity > 0),
  }));
});

const changeQuantityProduct: ChangeQuantityProduct = ({ listId, productId, quantity }) => {
  const prevValue = getValue(store);

  store.set({
    ...prevValue,
    lists: prevValue.lists.map((list) => {
      if (list.id !== listId) return list;

      const newProducts = list.products.map((product: any) => {
        if (product.id !== productId) return product;

        return { ...product, quantity };
      });

      return {
        ...list,
        products: newProducts,
      };
    }),
  });
};

export const useRelatedProducts = (initialValue?: RelatedProductsStore): any => {
  const value = getValue(store);

  if (initialValue && value?.productId !== initialValue?.productId) {
    store.set(initialValue);
  }

  return {
    changeQuantityProduct,
    allLists: useStore(store).lists,
    selectedLists: useStore(selectedLists),
  };
};
