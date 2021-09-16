export interface CategoryProps {
  url: string;
  title: string;
  icon: string;
  height: number;
  width: number;
}

export interface SubCategoryItemsProps {
  url: string;
  title: string;
}

export interface SubCategoryProps {
  url: string;
  title: string;
  items: SubCategoryItemsProps[];
}

export interface SitemapProps {
  url: string;
  title: string;
  color: string;
  categories: CategoryProps[];
  subCategories: SubCategoryProps[];
  tags: SubCategoryProps[];
}

export interface PageSiteMapData {
  h1: string;
  sitemap: SitemapProps[];
}
