import { BreadcrumbData } from '@Types/Breadcrumbs';
import { DeliveryTypeData, PaymentTypeData, PaymentVariantData } from '@Types/Cart';
import { ProductData } from '@Types/Product';

export interface SectionData {
  name: string;
  description: string;
  products: ProductData[];
}

export interface PageOrderCheckData {
  breadcrumbs: BreadcrumbData[];
  deliveryCostDescription: string;
  deliveryTypes: DeliveryTypeData[];
  paymentTypes: PaymentTypeData[];
  paymentVariants: PaymentVariantData[];
  prepaymentPercent: number;
  sections: SectionData[];
}
