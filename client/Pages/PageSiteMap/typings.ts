export interface CategoryData {
  url: string;
  title: string;
  icon: string;
  height: number;
  width: number;
}

export interface SitemapData {
  url: string;
  title: string;
  color: string;
  categories: CategoryData[];
}

export interface PageSiteMapData {
  h1: string;
  sitemap: SitemapData[];
}
