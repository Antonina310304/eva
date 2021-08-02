export interface InstallmentVariant {
  id: number;
  name: string;
  percent?: number;
  minPercent?: number;
  timePeriod: {
    value: number;
    unit: 'months' | 'years';
  };
  price: number;
  description: string;
  hint?: string;
}

export interface InstallmentBank {
  id: 'vtb' | 'belveb';
  variants: InstallmentVariant[];
  brandColor: string;
}
