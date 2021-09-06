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
  title: string;
}
export interface PageB2bDetailData {
  projects: ProjectItem;
  title: string;
  teaser: string;
  examples: ExamplesData[];
  test: any;
}
