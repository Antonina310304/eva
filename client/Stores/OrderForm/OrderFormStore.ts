import { createDerived, createStore, getValue, update } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';
import equal from 'fast-deep-equal';

import { CartStoreValue } from '@Stores/Cart';
import { DeliveryTypeData, PaymentTypeData, PaymentVariantData } from '@Types/Cart';

export interface SelectedIds {
  delivery: DeliveryTypeData['id'];
  paymentType: PaymentTypeData['id'];
  paymentVariant: PaymentVariantData['id'];
  discountVariant: string;
}

const orderFormStore = createStore<CartStoreValue>();
const selectedStore = createStore<SelectedIds>();

const selectedDeliveryStore = createDerived([orderFormStore, selectedStore], (form, selected) => {
  return form.deliveryTypes.find((dt) => dt.id === selected.delivery);
});

const visiblePaymentTypesStore = createDerived(
  [orderFormStore, selectedDeliveryStore],
  (form, selectedDelivery) => {
    return form.paymentTypes
      .filter((paymentType) => {
        return Boolean(
          selectedDelivery.paymentTypesIds.find((objId) => objId.id === paymentType.id),
        );
      })
      .filter((paymentType) => paymentType.visible);
  },
);

const selectedPaymentTypeStore = createDerived(
  [orderFormStore, selectedStore],
  (form, selected) => {
    return form.paymentTypes.find((pt) => pt.id === selected.paymentType);
  },
);

const availablePaymentVariantsStore = createDerived(
  [orderFormStore, selectedDeliveryStore, selectedPaymentTypeStore],
  (form, selectedDelivery, selectedPaymentType) => {
    if (!selectedPaymentType) return [];

    return form.paymentVariants.filter((paymentVariant) => {
      const founded = selectedDelivery.paymentTypesIds.find(
        (pt) => pt.id === selectedPaymentType.id,
      );

      return founded && founded.variants.includes(paymentVariant.id);
    });
  },
);

const selectedPaymentVariantStore = createDerived(
  [availablePaymentVariantsStore, selectedStore],
  (paymentVariants, selected) => {
    return paymentVariants.find((pv) => pv.id === selected?.paymentVariant);
  },
);

const selectedDiscountVariantStore = createDerived([selectedStore], (selected) => {
  return selected?.discountVariant;
});

// Универсальная информацию о купоне
const universalCouponStore = createDerived([orderFormStore], (form) => {
  if (form.gameDiscount === 0 && form.couponDiscount === 0) return null;

  return {
    text:
      form.gameDiscount > form.couponDiscount
        ? 'Скидка по результатам игры: '
        : 'Скидка по купону: ',
    sum: Math.max(form.gameDiscount, form.couponDiscount),
  };
});

const updateDelivery = (id: DeliveryTypeData['id'], newData: Partial<DeliveryTypeData>): void => {
  const form = getValue(orderFormStore);

  orderFormStore.set({
    ...form,
    deliveryTypes: form.deliveryTypes.map((dt) => {
      if (dt.id !== id) return dt;

      return { ...dt, ...newData };
    }),
  });
};

const updateCouponInfo = (newData: Partial<CartStoreValue>) => {
  update(orderFormStore, (prevValue) => ({
    ...prevValue,
    coupon: newData.coupon,
    couponData: newData.couponData,
    couponDiscount: newData.couponDiscount,
    discount: newData.discount,
    gameDiscount: newData.gameDiscount,
  }));
};

const select = (ids: Partial<SelectedIds>): void => {
  update(selectedStore, (prevValue) => ({ ...prevValue, ...ids }));
};

const selectDiscountVariant = (newVariant: string): void => {
  update(selectedStore, (prevValue) => ({
    ...prevValue,
    discountVariant: prevValue.discountVariant === newVariant ? null : newVariant,
  }));
};

const init = (initialValue: CartStoreValue): void => {
  const value = getValue(orderFormStore);

  if (initialValue && !equal(initialValue, value)) {
    orderFormStore.set(initialValue);

    // Способ доставки
    select({ delivery: initialValue.deliveryTypes[0].id });

    // Тип оплаты
    update(selectedStore, (prevValue) => {
      const visiblePaymentTypes = getValue(visiblePaymentTypesStore);
      const firstVisible = visiblePaymentTypes[0];
      const preferedPaymentType = visiblePaymentTypes.find((pt) => pt.prefered);
      const paymentType = preferedPaymentType || firstVisible || initialValue.paymentTypes[0];

      return { ...prevValue, paymentType: paymentType.id };
    });

    // Способ оплаты
    update(selectedStore, (prevValue) => {
      const paymentVariants = getValue(availablePaymentVariantsStore);

      return { ...prevValue, paymentVariant: paymentVariants[0].id };
    });

    // Вариант скидки
    update(selectedStore, (prevValue) => {
      const form = getValue(orderFormStore);
      const hasSpentBonuses = form.bonusPoints?.spentAmount > 0;
      const discountVariant = hasSpentBonuses ? 'bonuses' : 'promocode';

      return { ...prevValue, discountVariant };
    });
  }
};

export const useOrderForm = () => {
  return {
    ...useStore(orderFormStore),
    universalCoupon: useStore(universalCouponStore),
    visiblePaymentTypes: useStore(visiblePaymentTypesStore),
    availablePaymentVariants: useStore(availablePaymentVariantsStore),
    selectedDelivery: useStore(selectedDeliveryStore),
    selectedPaymentType: useStore(selectedPaymentTypeStore),
    selectedPaymentVariant: useStore(selectedPaymentVariantStore),
    selectedDiscountVariant: useStore(selectedDiscountVariantStore),
  };
};

export default { init, select, selectDiscountVariant, updateDelivery, updateCouponInfo };
