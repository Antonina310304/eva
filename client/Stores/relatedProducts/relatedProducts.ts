import { createStore, getValue, createDerived } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

export interface ChangeQuantityProductParams {
  listId: number;
  productId: number;
  quantity: number;
}

export type RelatedProductsStore = any[];
export type UseRelatedProducts = (initialValue?: RelatedProductsStore) => RelatedProductsStore;
export type ChangeQuantityProduct = (params: ChangeQuantityProductParams) => void;

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

const changeQuantityProduct: ChangeQuantityProduct = ({ listId, productId, quantity }) => {
  const prevLists = getValue(allLists);

  allLists.set(
    prevLists.map((list) => {
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
  );
};

export const useRelatedProducts = (initialValue?: any) => {
  if (initialValue && !getValue(allLists)) allLists.set(initialValue);

  return {
    addProduct,
    changeQuantityProduct,
    allLists: useStore(allLists),
    selectedLists: useStore(selectedLists),
  };
};
