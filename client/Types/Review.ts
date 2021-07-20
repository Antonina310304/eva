export interface ReviewPhotoData {
  id: number;
  image: string;
}

export interface ReviewData {
  author: string;
  created_at: string;
  id: number;
  is_recommend: boolean;
  is_star: boolean;
  link: string;
  photos: ReviewPhotoData[];
  rating: number;
  text: string;
  usefull_count: number;
  useless_count: number;
  videoInfo: any;
}
