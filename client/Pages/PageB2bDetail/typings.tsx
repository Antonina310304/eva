export interface ExamplesData {
  height: number;
  projectId: number;
  src: string;
  text: string[];
  title: string;
  width: number;
  length: number;
}
export interface ProjectItem {
  height?: number;
  projectId?: number;
  src?: string;
  text?: string[];
  title?: string;
  width?: number;
  length?: number;
  slice?: any;
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

export interface ProjectData {
  title: string;
}
export interface PageB2bDetailData {
  uniqueProjects: ProjectItem[];
  projects: ProjectData;
  title: string;
  teaser: string;
  examples: ExamplesData[];
  test: any;
  articles: ArticleItem[];
}
