import { SleeperData } from '@Types/SleeperGallery';

export const sleeperSliderData: string[] = [
  '/react/static/img/sleeper/banner/1.jpg',
  '/react/static/img/sleeper/banner/2.jpg',
  '/react/static/img/sleeper/banner/3.jpg',
  '/react/static/img/sleeper/banner/4.jpg',
  '/react/static/img/sleeper/banner/5.jpg',
];

export const sleeper: SleeperData = {
  slider: sleeperSliderData,
  products: [
    {
      id: 107374,
      name: '120 x 200см',
      bonus: 1500,
      price: { actual: 24290, expired: 34990, discount: 20 },
    },
    { id: 107375, name: '140 x 200см', price: { actual: 28690, expired: 41290, discount: 30 } },
    {
      id: 107376,
      name: '160 x 200см',
      bonus: 300,
      price: { actual: 29990, expired: 43290, discount: 5 },
    },
    { id: 107377, name: '180 x 200см', price: { actual: 34090, expired: 49290, discount: 30 } },
    {
      id: 107372,
      name: '80 x 200см',
      bonus: 1500,
      price: { actual: 18690, expired: 26990, discount: 15 },
    },
    {
      id: 107373,
      name: '90 x 200см',
      bonus: 1500,
      price: { actual: 19690, expired: 28490, discount: 85 },
    },
  ],
};
