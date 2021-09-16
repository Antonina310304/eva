export interface ExamplesData {
  height: number;
  projectId: number;
  src: string;
  text: string[];
  title: string;
  width: number;
}
export interface ProjectItem {
  height?: number;
  projectId?: number;
  src?: string;
  text?: string[];
  title?: string;
  width?: number;
}
export interface ArticleItem {
  id: number;
  link: string;
  src: string;
  logo: string;
  preview: string;
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
  articles: ArticleItem[];
}
