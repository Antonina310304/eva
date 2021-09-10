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

export const ideasMockProducts = [
  {
    imageUrl: 'react/static/img/mockIdeas/1.png',
    type: 'Кресло',
    totalPrice: '19 990 ₽',
    price: '23 990 ₽',
    discount: -15,
    title: 'Диван угловой Росис Velvet Blue',
    details: 'http://google.com',
    icons: [MockIcon1, MockIcon2, MockIcon3],
  },

  {
    imageUrl: 'react/static/img/mockIdeas/2.png',
    type: 'Кресло',
    totalPrice: '19 990 ₽',
    price: '23 990 ₽',
    discount: -15,
    title: 'Диван угловой Росис Velvet Blue',
    details: 'http://google.com',
    icons: [MockIcon1, MockIcon2, MockIcon3],
  },
  {
    imageUrl: 'react/static/img/mockIdeas/3.png',
    type: 'Топпер',
    totalPrice: '19 990 ₽',
    price: '23 990 ₽',
    discount: -15,
    title: 'Диван угловой Росис Velvet Blue',
    details: 'http://google.com',
    icons: [MockIcon1, MockIcon2, MockIcon3],
  },
  {
    imageUrl: 'react/static/img/mockIdeas/4.png',
    type: 'Кресло',
    totalPrice: '19 990 ₽',
    price: '23 990 ₽',
    discount: -15,
    title: 'Диван угловой Росис Velvet Blue',
    details: 'http://google.com',
    icons: [MockIcon1, MockIcon2, MockIcon3],
  },
  {
    imageUrl: 'react/static/img/mockIdeas/5.png',
    type: 'Топпер',
    totalPrice: '19 990 ₽',
    price: '23 990 ₽',
    discount: -15,
    title: 'Диван угловой Росис Velvet Blue',
    details: 'http://google.com',
    icons: [MockIcon1, MockIcon2, MockIcon3],
  },
];

export const productCardMock: ProductData[] = [
  {
    id: 1,
    name: 'Диван угловой Росис Velvet Blue',
    type: 'Диван',
    price: { actual: 19990, discount: 15, expired: 23990 },
    tags: [],
    parameters: [],
    variants: [],
    parameterValues: [],
    parameterGroups: [],
    link: 'http://google.com',
    images: [{ src: 'react/static/img/mockIdeas/1.png', orientation: 'landscape' }],
  },
];
