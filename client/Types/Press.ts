export interface ImageData {
  src: string;
}

export interface PublicationData {
  date: string;
  image: string;
  slug: string;
  name: string;
  text: string[];
  title: string;
  gallery: ImageData[];
}

export interface ArticleData {
  href: string;
  id: number;
  link: string;
  logo: string;
  preview: string;
  src: string;
  text: string;
  images: ImageData[];
}
