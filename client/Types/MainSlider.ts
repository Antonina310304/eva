export default interface MainSliderData {
  id: number;
  period?: string;
  header?: string;
  subtitle?: string;
  textLink?: string;
  link?: string;
  dateEnd?: number;
  images: {
    mobile: string;
    desktop: string;
  };
}
