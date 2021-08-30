import { IMainNav } from '@Types/MainNav';
import { IUserMenu } from '@Types/UserMenu';

export const mainNavList: IMainNav[] = [
  {
    title: 'Акции и скидки',
    icon: 'sale.svg',
    link: 'catalog',
    img: 'react/static/img/submenu-img.jpg',
    withBanner: true,
    banner: {
      title: 'Осенняя распродажа',
      text: 'Диваны от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть все',
      badge: 'sale',
    },

    dropDown: [
      {
        name: 'Тип',
        link: 'link',
        textLink: 'Все акции и скидки',
        items: [
          { title: 'Акции и скидки', link: 'ideas' },
          { title: 'Прямые диваны', link: 'ideas' },
          { title: 'Угловые диваны', link: 'ideas' },
          { title: 'Модульные диваны', link: 'ideas' },
          { title: 'Конструктор диванов', link: 'ideas' },
          { title: 'Распродажа диванов', link: 'ideas' },
          { title: 'Кресла', link: 'ideas' },
          { title: 'Кушетки', link: 'ideas' },
        ],
      },
      {
        name: 'Размер',
        link: '',
        textLink: 'Все акции и скидки',
        items: [
          { title: 'Одноместные', link: 'ideas' },
          { title: 'Двухместные', link: 'ideas' },
          { title: 'Трёхместные', link: 'ideas' },
          { title: 'Четырёхместные', link: 'ideas' },
        ],
      },
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все акции и скидки',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
          { title: 'Лофт', link: 'ideas' },
          { title: 'Минимализм', link: 'ideas' },
          { title: 'Прованс', link: 'ideas' },
        ],
      },
      {
        name: 'Тип обивки',
        link: '',
        textLink: 'Все акции и скидки',
        items: [
          { title: 'Натуральная кожа', link: 'ideas' },
          { title: 'Ткань', link: 'ideas' },
          { title: 'Экокожа', link: 'ideas' },
        ],
      },
    ],
  },
  {
    title: 'Диваны и кресла',
    icon: 'divans.svg',
    link: 'ideas',
    img: 'react/static/img/submenu-img.jpg',
    withBanner: true,
    banner: {
      title: 'Стильные сканди-новинки',
      text: 'Минималистичные диваны с раскладным механизмом от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть 6 моделей',
      badge: 'sale',
    },
    dropDown: [
      {
        name: 'Тип',
        link: 'divans',
        textLink: 'Все диваны и кресла',
        items: [
          { title: 'Диваны и кресла', link: 'ideas' },
          { title: 'Прямые диваны', link: 'ideas' },
          { title: 'Угловые диваны', link: 'ideas' },
          { title: 'Модульные диваны', link: 'ideas' },
        ],
      },
      {
        name: 'Размер',
        link: '',
        textLink: 'Все диваны и кресла',
        items: [
          { title: 'Одноместные', link: 'ideas' },
          { title: 'Двухместные', link: 'ideas' },
          { title: 'Трёхместные', link: 'ideas' },
          { title: 'Четырёхместные', link: 'ideas' },
        ],
      },
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все диваны и кресла',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
        ],
      },
      {
        name: 'Тип обивки',
        link: '',
        textLink: 'Все диваны и кресла',
        items: [
          { title: 'Натуральная кожа', link: 'ideas' },
          { title: 'Ткань', link: 'ideas' },
          { title: 'Экокожа', link: 'ideas' },
        ],
      },
    ],
  },
  {
    title: 'Шкафы',
    icon: 'wardrobe.svg',
    link: 'about',
    img: 'react/static/img/submenu-img.jpg',
    withBanner: true,
    banner: {
      title: 'Осенняя распродажа',
      text: 'Диваны от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть все',
      badge: 'sale',
    },

    dropDown: [
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все шкафы',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
          { title: 'Лофт', link: 'ideas' },
          { title: 'Минимализм', link: 'ideas' },
        ],
      },
      {
        name: 'Тип',
        link: '',
        textLink: 'Все шкафы',
        items: [
          { title: 'Гардеробная', link: 'ideas' },
          { title: 'Купе', link: 'ideas' },
          { title: 'Распашной', link: 'ideas' },
          { title: 'Угловой', link: 'ideas' },
        ],
      },
      {
        name: 'Количество дверей',
        link: '',
        textLink: 'Все шкафы',
        items: [
          { title: 'Двухдверный', link: 'ideas' },
          { title: 'Однодверный', link: 'ideas' },
          { title: 'Трехдверный', link: 'ideas' },
          { title: 'Четырехдверный', link: 'ideas' },
        ],
      },
      {
        name: 'Тип наполнителя',
        link: '',
        textLink: 'Все шкафы',
        items: [
          { title: 'Бельевое', link: 'ideas' },
          { title: 'Комбинированное', link: 'ideas' },
          { title: 'Платяное', link: 'ideas' },
        ],
      },
    ],
  },
  {
    title: 'Спальня',
    icon: 'bedroom.svg',
    link: 'store',
    img: 'react/static/img/submenu-img.jpg',
    withBanner: true,
    banner: {
      title: 'Осенняя распродажа',
      text: 'Диваны от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть все',
      badge: 'sale',
    },

    dropDown: [
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все спальни',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
          { title: 'Лофт', link: 'ideas' },
          { title: 'Минимализм', link: 'ideas' },
          { title: 'Прованс', link: 'ideas' },
        ],
      },
      {
        name: 'Тип товара',
        link: '',
        textLink: 'Все спальни',
        items: [
          { title: 'Детская кровать', link: 'ideas' },
          { title: 'Комод', link: 'ideas' },
          { title: 'Консоль', link: 'ideas' },
          { title: 'Кровать', link: 'ideas' },
          { title: 'Матрас', link: 'ideas' },
          { title: 'Пуф', link: 'ideas' },
        ],
      },
      {
        name: 'Тип обивки',
        link: '',
        textLink: 'Все спальни',
        items: [
          { title: 'Натуральная кожа', link: 'ideas' },
          { title: 'Ткань', link: 'ideas' },
          { title: 'Экокожа', link: 'ideas' },
        ],
      },
    ],
  },
  {
    title: 'Гостиная',
    link: 'living-room',
    icon: 'hallway.svg',
    img: 'react/static/img/submenu-img.jpg',
    withBanner: true,
    banner: {
      title: 'Осенняя распродажа',
      text: 'Диваны от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть все',
      badge: 'sale',
    },

    dropDown: [
      {
        name: 'Тип товара',
        link: '',
        textLink: 'Все товары для гостиной',
        items: [
          { title: 'Витрина', link: 'ideas' },
          { title: 'Журнальный стол', link: 'ideas' },
          { title: 'Кабинет', link: 'ideas' },
          { title: 'Крижный шкаф', link: 'ideas' },
          { title: 'Комод', link: 'ideas' },
          { title: 'Комплект столов', link: 'ideas' },
          { title: 'Модульная гостинная', link: 'ideas' },
        ],
      },
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все товары для гостиной',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
          { title: 'Лофт', link: 'ideas' },
          { title: 'Минимализм', link: 'ideas' },
          { title: 'Прованс', link: 'ideas' },
        ],
      },
      {
        name: 'Тип обивки',
        link: '',
        textLink: 'Все товары для гостиной',
        items: [
          { title: 'Натуральная кожа', link: 'ideas' },
          { title: 'Ткань', link: 'ideas' },
          { title: 'Экокожа', link: 'ideas' },
        ],
      },
    ],
  },
  {
    title: 'Прихожая',
    icon: 'hallway.svg',
    link: 'ideas',
    withBanner: true,
    banner: {
      title: 'Осенняя распродажа',
      text: 'Диваны от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть все',
      badge: 'sale',
    },

    img: 'react/static/img/submenu-img.jpg',
    dropDown: [
      {
        name: 'Тип',
        link: '',
        textLink: 'Все товары',
        items: [
          { title: 'Банкетка', link: 'ideas' },
          { title: 'Вешалка', link: 'ideas' },
          { title: 'Вешалка напольная', link: 'ideas' },
          { title: 'Вешалка настенная', link: 'ideas' },
          { title: 'Зеркало', link: 'ideas' },
          { title: 'Комод', link: 'ideas' },
          { title: 'Мини прихожая', link: 'ideas' },
          { title: 'Обувница', link: 'ideas' },
        ],
      },
      {
        name: 'Размер',
        link: '',
        textLink: 'Все товары',
        items: [
          { title: 'Одноместные', link: 'ideas' },
          { title: 'Двухместные', link: 'ideas' },
          { title: 'Трёхместные', link: 'ideas' },
          { title: 'Четырёхместные', link: 'ideas' },
        ],
      },
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все товары',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
          { title: 'Лофт', link: 'ideas' },
          { title: 'Минимализм', link: 'ideas' },
          { title: 'Прованс', link: 'ideas' },
        ],
      },
      {
        name: 'Тип обивки',
        link: '',
        textLink: 'Все товары',
        items: [
          { title: 'Натуральная кожа', link: 'ideas' },
          { title: 'Ткань', link: 'ideas' },
          { title: 'Экокожа', link: 'ideas' },
        ],
      },
    ],
  },
  {
    title: 'Кухня',
    icon: 'kitchen.svg',
    link: 'about',
    withBanner: true,
    banner: {
      title: 'Осенняя распродажа',
      text: 'Диваны от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть все',
      badge: 'sale',
    },

    img: 'react/static/img/submenu-img.jpg',
    dropDown: [
      {
        name: 'Тип',
        link: '',
        textLink: 'Все товары для кухни',
        items: [
          { title: 'Кухня', link: 'ideas' },
          { title: 'Прямые диваны', link: 'ideas' },
          { title: 'Угловые диваны', link: 'ideas' },
          { title: 'Модульные диваны', link: 'ideas' },
          { title: 'Конструктор диванов', link: 'ideas' },
          { title: 'Распродажа диванов', link: 'ideas' },
          { title: 'Кресла', link: 'ideas' },
          { title: 'Кушетки', link: 'ideas' },
          { title: 'Бескаркасная мебель', link: 'ideas' },
          { title: 'Пуфы', link: 'ideas' },
          { title: 'Домашний текстиль', link: 'ideas' },
        ],
      },
      {
        name: 'Размер',
        link: '',
        textLink: 'Все товары для кухни',
        items: [
          { title: 'Одноместные', link: 'ideas' },
          { title: 'Двухместные', link: 'ideas' },
          { title: 'Трёхместные', link: 'ideas' },
          { title: 'Четырёхместные', link: 'ideas' },
        ],
      },
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все товары для кухни',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
          { title: 'Лофт', link: 'ideas' },
          { title: 'Минимализм', link: 'ideas' },
          { title: 'Прованс', link: 'ideas' },
        ],
      },
      {
        name: 'Тип обивки',
        link: '',
        textLink: 'Все товары для кухни',
        items: [
          { title: 'Натуральная кожа', link: 'ideas' },
          { title: 'Ткань', link: 'ideas' },
          { title: 'Экокожа', link: 'ideas' },
        ],
      },
    ],
  },
  {
    title: 'Детская',
    icon: 'сhildrens_room.svg',
    link: 'store',
    withBanner: true,
    banner: {
      title: 'Осенняя распродажа',
      text: 'Диваны от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть все',
      badge: 'sale',
    },

    img: 'react/static/img/submenu-img.jpg',
    dropDown: [
      {
        name: 'Тип',
        link: '',
        textLink: 'Все товары для детской',
        items: [
          { title: 'Детская', link: 'ideas' },
          { title: 'Прямые диваны', link: 'ideas' },
          { title: 'Угловые диваны', link: 'ideas' },
          { title: 'Модульные диваны', link: 'ideas' },
          { title: 'Конструктор диванов', link: 'ideas' },
          { title: 'Распродажа диванов', link: 'ideas' },
          { title: 'Кресла', link: 'ideas' },
          { title: 'Кушетки', link: 'ideas' },
          { title: 'Бескаркасная мебель', link: 'ideas' },
          { title: 'Пуфы', link: 'ideas' },
          { title: 'Домашний текстиль', link: 'ideas' },
        ],
      },
      {
        name: 'Размер',
        link: '',
        textLink: 'Все товары для детской',
        items: [
          { title: 'Одноместные', link: 'ideas' },
          { title: 'Двухместные', link: 'ideas' },
          { title: 'Трёхместные', link: 'ideas' },
          { title: 'Четырёхместные', link: 'ideas' },
        ],
      },
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все товары для детской',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
          { title: 'Лофт', link: 'ideas' },
          { title: 'Минимализм', link: 'ideas' },
          { title: 'Прованс', link: 'ideas' },
        ],
      },
      {
        name: 'Тип обивки',
        link: '',
        textLink: 'Все товары для детской',
        items: [
          { title: 'Натуральная кожа', link: 'ideas' },
          { title: 'Ткань', link: 'ideas' },
          { title: 'Экокожа', link: 'ideas' },
        ],
      },
    ],
  },
  {
    title: 'Кабинет',
    icon: 'cabinet.svg',
    link: 'store',
    withBanner: true,
    banner: {
      title: 'Осенняя распродажа',
      text: 'Диваны от 21 990 ₽',
      img: 'react/static/img/catalog-banner.png',
      link: 'link',
      textLink: 'Смотреть все',
      badge: 'sale',
    },

    img: 'react/static/img/submenu-img.jpg',
    dropDown: [
      {
        name: 'Тип',
        link: '',
        textLink: 'Все товары для кабинета',
        items: [
          { title: 'Кабинет', link: 'ideas' },
          { title: 'Прямые диваны', link: 'ideas' },
          { title: 'Угловые диваны', link: 'ideas' },
          { title: 'Модульные диваны', link: 'ideas' },
          { title: 'Конструктор диванов', link: 'ideas' },
          { title: 'Распродажа диванов', link: 'ideas' },
          { title: 'Кресла', link: 'ideas' },
          { title: 'Кушетки', link: 'ideas' },
          { title: 'Бескаркасная мебель', link: 'ideas' },
          { title: 'Пуфы', link: 'ideas' },
          { title: 'Домашний текстиль', link: 'ideas' },
        ],
      },
      {
        name: 'Размер',
        link: '',
        textLink: 'Все товары для кабинета',
        items: [
          { title: 'Одноместные', link: 'ideas' },
          { title: 'Двухместные', link: 'ideas' },
          { title: 'Трёхместные', link: 'ideas' },
          { title: 'Четырёхместные', link: 'ideas' },
        ],
      },
      {
        name: 'Стиль',
        link: '',
        textLink: 'Все товары для кабинета',
        items: [
          { title: 'Кантри', link: 'ideas' },
          { title: 'Классический', link: 'ideas' },
          { title: 'Лофт', link: 'ideas' },
          { title: 'Минимализм', link: 'ideas' },
          { title: 'Прованс', link: 'ideas' },
        ],
      },
      {
        name: 'Тип обивки',
        link: '',
        textLink: 'Все товары для кабинета',
        items: [
          { title: 'Натуральная кожа', link: 'ideas' },
          { title: 'Ткань', link: 'ideas' },
          { title: 'Экокожа', link: 'ideas' },
        ],
      },
    ],
  },
];

export const userBottomMenu: IUserMenu[] = [
  {
    title: 'Войти/зарегистрироваться',
    icon: 'user.svg',
  },
  {
    title: 'Адреса магазинов',
    icon: 'shops.svg',
  },
  {
    title: 'Доставка и оплата',
    icon: 'delivery.svg',
    link: 'delivery',
  },
  {
    title: 'Ваш город',
    icon: 'location.svg',
  },
];

export const UserMenuMobile: IUserMenu[] = [
  {
    title: 'Избранное',
    icon: 'favorites',
    link: 'favorites',
  },
  {
    title: 'Корзина',
    icon: 'basket',
    link: 'basket',
  },
];
export const UserMenuDesktop: IUserMenu[] = [
  {
    title: 'Личный кабинет',
    icon: 'user',
    link: 'personal',
  },
  {
    title: 'Избранное',
    icon: 'favorites',
    link: 'favorites',
    // isChecked: true,
    // count: 3,
  },
  {
    title: 'Корзина',
    icon: 'basket',
    link: 'basket',
    isChecked: true,
    count: 5,
    isDisabled: true,
  },
];
