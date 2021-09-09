import { ButtonTabsProps } from '@UI/ButtonTabs';
import MockIcon from '@Pages/PageIndex/elems/Ideas/MockIcon';

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
    imageUrl: 'https://data2.1freewallpapers.com/download/background-gray-abstract.jpg',
    type: 'Кресло',
    totalPrice: '42 500',
    price: '50 000',
    discount: 15,
    title: 'Диван угловой Росис Velvet Blue',
    details: 'http://google.com',
    icons: [MockIcon, MockIcon, MockIcon],
  },
  {
    imageUrl:
      'https://www.zastavki.com/pictures/1920x1080/2014/Backgrounds_On_blue_background_wallpaper_082199_23.jpg',
    type: 'Кресло',
  },
  {
    imageUrl: 'https://img3.goodfon.ru/original/1920x1080/6/6c/fon-oranzhevyy-perehod-yarko-po.jpg',
    type: 'Топпер',
  },
  {
    imageUrl: 'https://storge.pic2.me/cm/3840x2160/933/588866e31688f.jpg',
    type: 'Кресло',
  },
  {
    imageUrl:
      'https://images.wallpaperscraft.ru/image/single/fioletovyy_temnyy_fon_pyatna_65626_1920x1080.jpg',
    type: 'Топпер',
  },
];
