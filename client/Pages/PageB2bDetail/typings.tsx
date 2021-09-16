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

export interface ImageData {
  src: string;
}

export interface ArticleItem {
  id: number;
  link: string;
  src: string;
  logo: string;
  preview: string;
  images: ImageData[];
}

export interface ProjectData {
  title: string;
}

export interface PageB2bDetailData {
  projects: ProjectData;
  title: string;
  teaser: string;
  examples: ExamplesData[];
  articles: ArticleItem[];
}
