export interface PaymentItem {
  id: number;
  name: string;
  description: string;
  icon: string;
  visible: boolean;
}

export interface PagePaymentData {
  title: string;
  teaserText?: string;
  pageMenu: any[];
  paymentTypes: PaymentItem[];
  finalText?: string;
}
