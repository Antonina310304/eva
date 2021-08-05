import { createStore, getValue, createDerived, WritableStore } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

export type RelatedProductsStore = any[];
export type UseRelatedProducts = (initialValue?: RelatedProductsStore) => RelatedProductsStore;

const allLists = createStore<any[]>();

const selectedLists = createDerived(allLists, (list) => {
  return list.map((item) => ({
    ...item,
    products: item.products.filter((product: any) => product.quantity > 0),
  }));
});

const addProduct = (product: any) => {
  allLists.set([...getValue(allLists), product]);
};

export const useRelatedProducts = (initialValue?: any) => {
  if (initialValue) allLists.set(initialValue);

  return {
    addProduct,
    allLists: useStore(allLists),
    selectedLists: useStore(selectedLists),
  };
};
