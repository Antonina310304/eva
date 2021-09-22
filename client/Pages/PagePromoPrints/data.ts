import { PrintOffersData, PrintSliderData } from '@Types/PrintOffers';

export const printOffers: PrintOffersData[] = [
  {
    image: '/react/static/img/prints/image-1.png',
    printId: 'yellow_tiger',
    name: 'Кано Hygge Magenta ',
    price: {
      old: 16990,
      current: 15990,
    },
  },
  {
    image: '/react/static/img/prints/image-2.png',
    printId: 'yellow_tiger',
    name: 'Диван Росис',
    price: {
      old: 39990,
      current: 23500,
    },
  },
  {
    image: '/react/static/img/prints/image-3.png',
    printId: 'yellow_tiger',
    name: 'Деко 40х40 Tiger Yellow',
    price: {
      old: 990,
      current: 790,
    },
  },
  {
    image: '/react/static/img/prints/image-4.png',
    printId: 'chess_black',
    name: 'Кано Chess Black',
    price: {
      current: 15990,
    },
  },
  {
    image: '/react/static/img/prints/image-5.png',
    printId: 'chess_black',
    name: 'Кускен Chess Black',
    price: {
      old: 39990,
      current: 23500,
    },
  },
  {
    image: '/react/static/img/prints/image-6.png',
    printId: 'chess_black',
    name: 'Деко 40х40 Chess Black',
    price: {
      old: 990,
      current: 790,
    },
  },
  {
    image: '/react/static/img/prints/image-7.png',
    printId: 'velvet_tropical',
    name: 'Плиди Honey Yellow',
    price: {
      old: 5990,
      current: 4990,
    },
  },
  {
    image: '/react/static/img/prints/image-8.png',
    printId: 'velvet_tropical',
    name: 'Поли Honey Yellow',
    price: {
      old: 29990,
      current: 23990,
    },
  },
  {
    image: '/react/static/img/prints/image-9.png',
    printId: 'velvet_tropical',
    name: 'Куб Honey Yellow',
    price: {
      current: 3990,
    },
  },
];

export const printSlider: PrintSliderData = {
  prints: [
    {
      id: 'yellow_tiger',
      name: 'Yellow tiger',
      pattern: '/react/static/img/prints/yellow_tiger.png',
      preview: '/react/static/img/prints/yellow_tiger_preview.png',
      color: '#FFF3C9',
    },
    {
      id: 'chess_black',
      name: 'Chess Black',
      pattern: '/react/static/img/prints/chess_black.png',
      preview: '/react/static/img/prints/chess_black_preview.png',
      color: '#c0cfde',
    },
    {
      id: 'velvet_tropical',
      name: 'Velvet Tropical',
      pattern: '/react/static/img/prints/velvet_tropical.png',
      preview: '/react/static/img/prints/velvet_tropical_preview.png',
      color: '#c8d7c3',
    },
  ],
  offers: printOffers,
};
