export interface RubricsItem {
  link: string;
  src: string;
  text: string;
  title: string;
}

export interface ArticleItem {
  id: number;
  link: string;
  src: string;
  logo: string;
  preview: string;
  length: number;
  images: any;
}

export interface PressItem {
  title: string;
  description: string;
}

export type DescriptionData = string[];
export interface TextItem {
  descriptions: DescriptionData[];
  press: PressItem;
  title: string;
}
export interface PageB2bData {
  test: string;
  banner: string;
  rubrics: RubricsItem;
  articles: ArticleItem;
  texts: TextItem;
}
