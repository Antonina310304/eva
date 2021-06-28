import { ProductData } from '@Types/Product';

export interface OrderData {
  date: string;
  products: ProductData[];

  /**
   * Номер заказа
   */
  number: number;

  /**
   * Общая стоимость заказа
   */
  summary: number;

  /**
   * Количество начисленных/списанных бонусов за заказ
   */
  points: number;

  /**
   * Статус заказа
   */
  status: 'Canceled' | 'DeliveryCanceled' | 'Created' | 'Delivered' | 'Processing';

  /**
   * Стоимость дополнительных услуг
   */
  costAdditionalServices?: number;
}
