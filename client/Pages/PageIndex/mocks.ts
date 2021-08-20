import { BreadcrumbData } from '@Types/Breadcrumbs';

import { FooterNavData } from '@Types/SiteNavigationData';
import { IconData, IconPaymentData } from '@Types/IconSocial';

export const mockBreadcrumbsItems: BreadcrumbData[] = [
  {
    text: 'Главная',
    link: 'index',
  },
  {
    text: 'Диваны и кресла',
    link: 'catalog',
  },
  {
    text: 'Диван угловой Порту Textile Grey',
    link: 'divan-uglovoj',
  },
];

export const mockPaymentSystemList: IconPaymentData[] = [
  {
    name: 'master card',
    icon: 'masterCard',
  },
  {
    name: 'visa',
    icon: 'visa',
  },
  {
    name: 'mir',
    icon: 'mir',
  },
];

export const mockSocialList: IconData[] = [
  {
    name: 'instagram',
    link: 'https://www.instagram.com/?hl=ru',
    icon: 'instagram',
  },
  {
    name: 'facebook',
    link: 'https://www.facebook.com/',
    icon: 'facebook',
  },
  {
    name: 'vk',
    link: 'https://vk.com/',
    icon: 'vk',
  },
  {
    name: 'youtube',
    link: 'https://youtube.com/',
    icon: 'youtube',
  },
  {
    name: 'dzen',
    link: 'https://zen.yandex.ru/',
    icon: 'dzen',
  },
  {
    name: 'tiktok',
    link: 'https://www.tiktok.com/',
    icon: 'tiktok',
  },
];

export const footerNavFeedback: FooterNavData = {
  title: 'Свяжитесь с нами',
  childrenList: [
    {
      title: '7(495) 154 38 02 ',
      url: 'tel:7(495) 154 38 02 ',
    },
    {
      title: 'love@divan.ru',
      url: 'mailto:love@divan.ru',
    },
    {
      title: 'Перезвоните мне',
      url: 'call-me',
    },
    {
      title: 'Задать вопрос',
      url: 'faq',
    },
    {
      title: 'Видеоконсультация со специалистом',
      url: 'video',
    },
    {
      title: 'Контакты',
      url: 'contacts',
    },
    {
      title: 'Обращение в отдел качества',
      url: 'quality-department',
    },
    {
      title: 'Написать руководству',
      url: 'email',
    },
  ],
};

export const footerNavCallCenter: FooterNavData = {
  title: 'Call-центр',
  childrenList: [
    {
      title: 'ежедневно с 9:00 до 22:00',
    },
  ],
};

export const footerNavDelivery: FooterNavData = {
  title: 'Доставка заказов',
  childrenList: [
    {
      title: 'ежедневно с 9:00 до 23:00',
    },
  ],
};

export const footerNavSubscription: FooterNavData = {
  title: 'Подписаться на рассылку',
  childrenList: [
    {
      title: 'ежедневно с 9:00 до 23:00',
    },
  ],
};

export const footerNavBuyers: FooterNavData = {
  title: 'Информация для покупателей',
  childrenList: [
    {
      title: 'О компании',
      url: 'about',
    },
    {
      title: 'Адреса магазинов',
      url: 'address',
    },
    {
      title: 'Конструктор',
      url: 'designer',
    },
    {
      title: 'Дисконтная программа',
      url: 'program',
    },
    {
      title: 'Доставка',
      url: 'delivery',
    },
    {
      title: 'Способы оплаты',
      url: 'payments',
    },
    {
      title: 'Гарантия',
      url: 'guaranty',
    },
    {
      title: 'Карта сайта',
      url: 'map',
    },
    {
      title: 'Для бизнеса',
      url: 'business',
    },
  ],
};

export const footerNavCatalog: FooterNavData = {
  title: 'Каталог',
  childrenList: [
    {
      title: 'Мягкая мебель',
      url: 'upholstered_furniture',
    },
    {
      title: 'Корпусная мебель',
      url: 'case_furniture',
    },
    {
      title: 'Бескаркасная мебель',
      url: 'frameless_furniture',
    },
    {
      title: 'Модульная мебель',
      url: 'modular_furniture',
    },
    {
      title: 'Мебель трансформер',
      url: 'transformer_furniture',
    },
    {
      title: 'Распродажа мебели',
      url: 'sale',
    },
    {
      title: 'Столы и стулья',
      url: 'tables_chairs',
    },
  ],
};

export const footerNavReviews: FooterNavData = {
  title: 'Читайте отзывы',
  childrenList: [
    {
      title: 'Яндекс Маркет',
      url: 'ymarket',
    },
  ],
};

export const footerNavWinner: FooterNavData = {
  title: 'Победитель',
  childrenList: [
    {
      title: 'Red Dot Award',
      url: 'Red_dot_award',
    },
    {
      title: 'Премия Рунета',
      url: 'runet',
    },
  ],
};

export const footerNavPaySystems: FooterNavData = {
  title: 'Платежные системы',
};
