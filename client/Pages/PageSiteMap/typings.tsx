export interface CategoryProps {
  url: string;
  title: string;
  icon: string;
  height: number;
  width: number;
}

export interface SitemapProps {
  url: string;
  title: string;
  color: string;
  categories: CategoryProps[];
}

export interface PageSiteMapData {
  h1: string;
  sitemap: SitemapProps[];
}
