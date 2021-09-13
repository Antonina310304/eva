import { ButtonTabsProps } from '@UI/ButtonTabs';
import { MockIcon1, MockIcon2, MockIcon3 } from '@Pages/PageIndex/elems/Ideas/MockIcon';
import CrossSaleProductCard, { CrossSaleProductCardProps } from '@Components/CrossSaleProductCard';
import { ProductData } from '@Types/Product';

export const ideasMockButtonTabs: ButtonTabsProps = {
  scrollable: true,
  defaultValue: 'all',
  tabs: [
    {
      id: 'all',
      label: 'Все категории',
    },
    { id: 'Кресло', label: 'Кресло' },
    { id: 'Топпер', label: 'Топпер' },
    { id: 'Пуф', label: 'Пуф' },
    { id: 'Журнальный стол', label: 'Журнальный стол' },
    { id: 'ТВ-тумба', label: 'ТВ-тумба' },
    { id: 'Ковер', label: 'Ковер' },
    { id: 'Подлокотник', label: 'Подлокотник' },
    { id: 'Плед', label: 'Плед' },
    { id: 'Подушка', label: 'Подушка' },
  ],
  onChangeTab: (event, tab) => false,
};

export const ideasMockProducts: Partial<ProductData>[] = [
  {
    id: 1,
    name: 'Диван угловой Росис Velvet Blue',
    type: 'Диван',
    price: { actual: 19990, discount: 15, expired: 23990 },
    tags: [
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag3.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag2.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag1.svg', orientation: 'landscape' },
        location: 'down',
      },
    ],
    link: 'http://google.com',
    images: [{ src: 'react/static/img/mockIdeas/1.png', orientation: 'landscape' }],
  },
  {
    id: 2,
    name: 'Диван угловой Росис Velvet Blue',
    type: 'Диван',
    price: { actual: 19990, discount: 15, expired: 23990 },
    tags: [
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag3.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag2.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag1.svg', orientation: 'landscape' },
        location: 'down',
      },
    ],
    link: 'http://google.com',
    images: [{ src: 'react/static/img/mockIdeas/2.png', orientation: 'landscape' }],
  },
  {
    id: 3,
    name: 'Диван угловой Росис Velvet Blue',
    type: 'Диван',
    price: { actual: 19990, discount: 15, expired: 23990 },
    tags: [
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag3.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag2.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag1.svg', orientation: 'landscape' },
        location: 'down',
      },
    ],
    link: 'http://google.com',
    images: [{ src: 'react/static/img/mockIdeas/3.png', orientation: 'landscape' }],
  },
  {
    id: 4,
    name: 'Диван угловой Росис Velvet Blue',
    type: 'Диван',
    price: { actual: 19990, discount: 15, expired: 23990 },
    tags: [
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag3.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag2.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag1.svg', orientation: 'landscape' },
        location: 'down',
      },
    ],
    link: 'http://google.com',
    images: [{ src: 'react/static/img/mockIdeas/4.png', orientation: 'landscape' }],
  },
  {
    id: 5,
    name: 'Диван угловой Росис Velvet Blue',
    type: 'Диван',
    price: { actual: 19990, discount: 15, expired: 23990 },
    tags: [
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag3.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag2.svg', orientation: 'landscape' },
        location: 'down',
      },
      {
        title: '123',
        image: { src: 'react/static/img/mockIdeas/tags/tag1.svg', orientation: 'landscape' },
        location: 'down',
      },
    ],
    link: 'http://google.com',
    images: [{ src: 'react/static/img/mockIdeas/5.png', orientation: 'landscape' }],
  },
];
