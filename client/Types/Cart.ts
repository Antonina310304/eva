export interface PaymentVariantData {
  id: 'full' | 'part';
  description: string;
  sum: number;
}

export interface CouponData {
  text: string;
  sum: number;
}

export interface CartBonusPointsData {
  availableAmount: number;
  earnedAmount: number;
  spentAmount: number;
}

export interface CartCouponData {
  code: string;
  type: number;
  amount: number;
}

export interface CartUniversalCouponData {
  text: string;
  sum: number;
}

export interface CartDeliveryData {
  freeDeliveryAvailable: boolean;
  isFreeDelivery: boolean;
  untilFreeDelivery: number;
}

export interface CartProductData {
  category: string;
  groups: any[];
  id: number;
  image: string;
  link: string;
  name: string;
  oldPrice: number;
  price: number;
  quantity: number;
  type: string;
  variant: number;
}

export interface CartPositionData {
  cost: number;
  deactivateControls: boolean;
  discount: number;
  gallery: string[];
  hasDisabledDiscount: boolean;
  hasVisibleDiscount: boolean;
  hidden: boolean;
  id: string;
  isKit: boolean;
  maxQuantity: number;
  oldPrice: number;
  price: number;
  products: CartProductData[];
  quantity: number;
  relatedProducts: CartProductData[];
  title: string;
}

export interface CartData {
  processing?: boolean;
  affiliation: string;
  bonusPoints?: CartBonusPointsData;
  cost: number;
  count: number;
  coupon: string;
  couponData: CartCouponData;
  couponDiscount: number;
  universalCoupon: CartUniversalCouponData;
  delivery: CartDeliveryData;
  discount: number;
  gameDiscount: number;
  hasConfiguredPositions: boolean;
  meta: {
    marketing: any;
  };
  newPositions: CartPositionData[];
  positions: CartPositionData[];
  removedPositions: CartPositionData[];
  relatedTitle?: string;
  relatedProducts?: any[];
  checkedDelivery: any;
  deliveryPrice: any;
  selectedVariant: 'bonuses' | 'promocode';
}

export interface DeliveryTypeData {
  id: number;
  address?: string;
  name: string;
  description?: string;
  sum?: number;
  type: 'toAddress' | 'pickupPoint';
}
