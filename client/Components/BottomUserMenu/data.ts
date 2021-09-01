import { IUserMenu } from '@Types/UserMenu';

const BottomMenuData: IUserMenu[] = [
  {
    title: 'Позвонить',
    icon: 'phone',
    link: 'phone',
    isDisabled: true,
  },
  {
    title: 'Написать',
    icon: 'message',
    link: 'message',
    isDisabled: true,
  },
  {
    title: 'Избранное',
    icon: 'favorites',
    link: 'favorites',
    count: 5,
  },
  {
    title: 'Корзина',
    icon: 'basket',
    link: 'basket',
  },
];

export default BottomMenuData;
