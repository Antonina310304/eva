import { ProductSearchData } from '@Types/Product';
import { SearchResultData, OfferSearchData } from '@Types/SearchResultData';

export const offers: OfferSearchData[] = [
  { title: 'Диваны Динс', link: 'divans' },
  { title: 'Кресла Динс', link: 'chairs' },
  { title: 'Серия мебели Динс', link: 'dins' },
  { title: 'Кушетки Динс', link: 'couches' },
  { title: 'Зеркальные шкафы', link: 'wardrobe' },
];

export const viewed = [
  { title: 'Диваны Динс', link: 'divans' },
  { title: 'Кресла Динс', link: 'chairs' },
];

export const hits: ProductSearchData[] = [
  {
    id: 3,
    img: '/react/static/img/products/product1.png',
    link: 'link',
    name: 'Роби Textile Light',
    price: 20690,
  },
  {
    id: 4,
    img: '/react/static/img/products/product1.png',
    link: 'link',
    name: 'Медли-1 White',
    price: 3490,
  },
  {
    id: 5,
    img: '/react/static/img/products/product2.png',
    link: 'link',
    name: 'Медли-1 White',
    price: 3490,
  },
];

export const products: ProductSearchData[] = [
  {
    id: 0,
    img: '/react/static/img/products/product1.png',
    link: 'link',
    name: 'Диван угловой Росис Velvet Blue',
    price: 19990,
  },
  {
    id: 1,
    img: '/react/static/img/products/product1.png',
    link: 'link',
    name: 'Шерона 140 Sherst Beige',
    price: 24640,
  },
  {
    id: 2,
    img: '/react/static/img/products/product2.png',
    link: 'link',
    name: 'Слипсон Мини Happy Yellow',
    price: 20690,
  },
  {
    id: 3,
    img: '/react/static/img/products/product1.png',
    link: 'link',
    name: 'Роби Textile Light',
    price: 20690,
  },
  {
    id: 4,
    img: '/react/static/img/products/product1.png',
    link: 'link',
    name: 'Медли-1 White',
    price: 3490,
  },
  {
    id: 5,
    img: '/react/static/img/products/product2.png',
    link: 'link',
    name: 'Медли-1 White',
    price: 3490,
  },
];

export const searchResult: SearchResultData = {
  request: 'лупа',
  matches: [
    { title: 'Диваны Динс', link: 'divans' },
    { title: 'Кресла Динс', link: 'chairs' },
  ],
  products: [
    {
      id: 0,
      img: '/react/static/img/products/product1.png',
      link: 'link',
      name: 'Диван угловой Росис Velvet Blue',
      price: 19990,
    },
    {
      id: 1,
      img: '/react/static/img/products/product1.png',
      link: 'link',
      name: 'Шерона 140 Sherst Beige',
      price: 24640,
    },
    {
      id: 2,
      img: '/react/static/img/products/product2.png',
      link: 'link',
      name: 'Слипсон Мини Happy Yellow',
      price: 20690,
    },
  ],
  link: 'link',
};
