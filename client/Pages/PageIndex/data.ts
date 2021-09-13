import { SellPointData } from '@Components/SectionShowroomsMap/typings';
import { ProductData } from '@Types/Product';
import { InstagramPostData } from '@Types/InstagramPost';
import MainSliderData from '@Types/MainSlider';
import { PopularData } from '@Types/PopularCategory';

export const maps = {
  center: [55.751574, 37.573856],
  zoom: 9,
  title: 'Лучше один раз увидеть!',
  description:
    'Мы предлагаем самый актуальный ассортимент на сегодня и предоставляем клиентам все возможности быть уверенными в покупке. Приглашаем посетить фирменные шоу-румы и лично оценить качество используемых тканей и материалов, проверить комфортность наполнения и работы механизмов, убедиться в удобстве и надежности нашей мебели!',
  regionId: 1,
};

export const pickupPoints: SellPointData[] = [
  {
    id: 'showroom_empire',
    regionId: 1,
    coordinates: [55.905494, 37.539279],
    name: 'МЦ «Империя»',
    address:
      '<span class="word">г. Москва,</span> <span class="word">Дмитровское шоссе,</span> <span class="word">161б,</span> <span class="word">1 этаж,</span> <span class="word">МЦ «Империя»</span>',
    phone: '+7 (495) 266-64-03',
    worktime: ['Ежедневно', 'с 10:00 до 21:00'],
    holidaysSchedule: [],
    tags: [2],
    images: [
      '/assets/thumb/sliders/525436/x_ffffff_100_0_2018103011392010800_80.jpg',
      '/assets/thumb/sliders/525437/x_ffffff_100_0_2018103011392910800_80.jpg',
    ],
  },
  {
    id: 'showroom_west',
    regionId: 1,
    coordinates: [55.755414, 37.402749],
    name: 'ТЦ «Западный»',
    address:
      '<span class="word">г. Москва,</span> <span class="word">Рублевское шоссе,</span> <span class="word">52а,</span> <span class="word">2 этаж,</span> <span class="word">ТЦ «Западный»</span> <span class="word">(ст. метро Крылатское)</span>',
    phone: '+7 (499) 460-56-70',
    worktime: ['Ежедневно', 'с 10:00 до 22:00'],
    holidaysSchedule: [],
    tags: [2],
    images: [
      '/assets/thumb/sliders/2139915/x_ffffff_100_0_2020081707012810800_80.jpeg',
      '/assets/thumb/sliders/2139916/x_ffffff_100_0_2020081707013810800_80.jpg',
    ],
  },
  {
    id: 'showroom_praga',
    regionId: 1,
    coordinates: [55.600931, 37.609129],
    name: 'ТЦ «Прага»',
    address:
      '<span class="word">г. Москва,</span> <span class="word">Россошанский проезд,</span> <span class="word">3,</span> <span class="word">ТЦ «Прага»</span> <span class="word">(ст. метро Академика Янгеля)</span>',
    phone: '+7 (495) 745-27-20',
    worktime: ['Ежедневно', 'с 10:00 до 21:00'],
    holidaysSchedule: [],
    tags: [2, 8],
    images: [
      '/assets/thumb/sliders/1458761/x_ffffff_100_0_2019121112512510800_80.jpg',
      '/assets/thumb/sliders/1458762/x_ffffff_100_0_2019121112513410800_80.jpg',
    ],
  },
  {
    id: 'showroom_rumer',
    regionId: 1,
    coordinates: [55.709992, 37.654287],
    name: 'ТЦ «Румер»',
    address:
      '<span class="word">г. Москва,</span> <span class="word">ул. Ленинская Слобода,</span> <span class="word">26,</span> <span class="word">2 этаж,</span> <span class="word">ТЦ «Румер»</span> <span class="word">(ст. метро Автозаводская)</span>',
    phone: '+7 (499) 322-95-17',
    worktime: ['Ежедневно', 'с 10:00 до 22:00'],
    holidaysSchedule: [],
    tags: [2],
    images: [
      '/assets/thumb/sliders/383978/x_ffffff_100_0_2018062806430710800_80.jpg',
      '/assets/thumb/sliders/383979/x_ffffff_100_0_2018062806431710800_80.jpg',
    ],
  },
  {
    id: 'showroom_mir',
    regionId: 1,
    coordinates: [55.783139, 37.642671],
    name: 'ст. метро Проспект Мира',
    address:
      '<span class="word">г. Москва,</span> <span class="word">ул. Большая Переяславская,</span> <span class="word">10,</span> <span class="word">(ст. метро Проспект Мира)</span>',
    phone: '+7 (495) 748-79-00',
    worktime: ['Ежедневно', 'с 10:00 до 22:00'],
    holidaysSchedule: [],
    tags: [2],
    images: [
      '/assets/thumb/sliders/2983525/x_ffffff_100_0_2021040207391610800_80.jpg',
      '/assets/thumb/sliders/2983527/x_ffffff_100_0_2021040207392110800_80.jpg',
    ],
  },
  {
    id: 'showroom_reutov_park',
    regionId: 1,
    coordinates: [55.752283, 37.887247],
    name: 'ТРЦ «Реутов Парк»',
    address:
      '<span class="word">Московская обл.,</span> <span class="word">г. Реутов,</span> <span class="word">Носовихинское шоссе,</span> <span class="word">д. 45,</span> <span class="word">ТРЦ «Реутов Парк»,</span> <span class="word">1 этаж</span> <span class="word">(ст. метро Новокосино)</span><br><span class="OrganizationsItem-AddressNote">Вход в шоу-рум на 2-м уровне парковки (справа от Входа №2)</span>',
    phone: '+7 (499) 460-56-43',
    worktime: ['Ежедневно', 'с 10:00 до 22:00'],
    holidaysSchedule: [],
    tags: [2],
    images: [
      '/assets/thumb/sliders/3026014/x_ffffff_100_0_2021041312275310800_80.jpg',
      '/assets/thumb/sliders/3026019/x_ffffff_100_0_2021041312281310800_80.jpg',
    ],
  },
  {
    id: 'showroom_prince_plasa',
    regionId: 1,
    coordinates: [55.6183455, 37.5071215],
    name: 'ТРЦ «Принц Плаза»',
    address:
      '<span class="word">г. Москва,</span> <span class="word"> ул. Профсоюзная,</span> <span class="word">129А,</span> <span class="word">5 этаж,</span> <span class="word">ТРЦ «Принц Плаза»</span>',
    phone: '+7 (499) 455-98-75',
    worktime: ['Ежедневно', 'с 10:00 до 21:00'],
    holidaysSchedule: [],
    tags: [2],
    images: [
      '/assets/thumb/sliders/3344539/x_ffffff_100_0_2021071609073910800_80.jpeg',
      '/assets/thumb/sliders/3344540/x_ffffff_100_0_2021071609075610800_80.jpeg',
    ],
  },
  {
    id: 'showroom_moscow_chest',
    regionId: 1,
    coordinates: [55.932571, 38.0063038],
    name: 'МЦ «Комод»',
    address:
      '<span class="word">Московская обл,</span> <span class="word">г. Щёлково,</span> <span class="word">Пролетарский пр.,</span> <span class="word">22,</span> <span class="word">МЦ «Комод»</span>',
    phone: '+7 (499) 460-03-29',
    worktime: ['Ежедневно', 'с 10:00 до 21:00'],
    holidaysSchedule: [],
    tags: [2],
    images: ['/assets/thumb/sliders/3338262/x_ffffff_100_0_2021071412244710800_80.jpg'],
  },
];

export const products: ProductData[] = [
  {
    id: 121415,
    modelId: 103571,
    type: 'Кресло',
    name: 'Гритон Textile Beige',
    link: '/product/kreslo-griton-textile-beige',
    price: { actual: 16990, expired: 18990, discount: 10 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/XFaUFwM6aTK5Z62NMFYkigF9G3RWTn0x1yCagtgx6hY/t:0::0:0/pd:66:24:66:24/rs:fit:352:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2MjQ4LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/geNqzVqtsQmiyPzgCn-TAcijhE-ECB9w_PJyfMBz5lQ/t:0::0:0/pd:66:24:66:24/rs:fit:352:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2MjQ1LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/ahlHkc0Urm1P0-J7AIBHOoHo98-iGZinE6C5ULOCm_Y/t:0::0:0/pd:66:24:66:24/rs:fit:352:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2MjQ2LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/aIQKbXK3Bf-XA93qSzmYrO8P1Ci9o7K8eM-sjLthdLs/t:0::0:0/pd:66:24:66:24/rs:fit:352:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2MjQwLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/iXhwvZkI2tw9FchcGGgfukR-_pQG9fvZf9ePX5XktAA/t:0::0:0/pd:66:24:66:24/rs:fit:352:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2MjQxLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/MTJHkI4WEIjO3vafRrl0jkMB55vUlMzbd8TKJD-Bbfc/t:0::0:0/pd:66:24:66:24/rs:fit:352:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2MjQzLmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [],
    categoryColor: '#f1e67f',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Длина' },
      { id: 41, groupId: 2, title: 'Ширина' },
      { id: 9, groupId: 2, title: 'Высота' },
    ],
    parameterValues: [
      { parameterId: 1, value: 96, unitId: 1, icon: '' },
      { parameterId: 41, value: 101, unitId: 1, icon: '' },
      { parameterId: 9, value: 92, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Кресло Гритон Textile Beige' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 121415 },
        { itemprop: 'mpn', content: 121415 },
        { itemprop: 'name', content: 'Кресло Гритон Textile Beige' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 16990 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/kreslo-griton-textile-beige' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 21475,
    modelId: 21498,
    type: 'Топпер',
    name: 'Слим 140x200',
    link: '/product/topper-slim-140x200',
    price: { actual: 2890, expired: 3490, discount: 17 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/WFtK6P2-eFajOTsA29RNHY60UGdiajtJhBPs0ofiwzo/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC81MTY2NDIuanBn.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/5GA2V7QKBsXtfD9OJZNkkWRhpig1yvFnjs5nAaOVQZk/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNzkwMzY5LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/nAg6a0T-kHwiovWCuSW6q0cKjatgOZ9ZgQetWJsqaDs/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNzkwMzcxLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/EGWm2nEIfJU77wbT8BObuDNiT62kOBmE4YJesFnjkEI/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNzkwMzcwLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/XjIk2uQlvCTWI-MLHvxJBpJk0DaryosuuV4JUQzdIb0/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNzkwMzcyLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/yCOAwQBTXykdfpiMgC2QRpOQHdoJ19GRqZ55eHdhIRQ/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC81MTY2NDMuanBn.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [
      {
        title: 'Доставка за 1 день',
        image: {
          src: '/assets/b9f6b2d8/1378222.svg?v=1573219294',
          srcMain: '/assets/677bf448/3166839.svg?v=1621844577',
        },
        location: 'down',
        sortOrder: 90,
      },
      {
        title: 'Есть в ТЦ «Прага»<br>Есть в ТЦ «Румер»<br>Есть в ТЦ «Западный»',
        image: {
          src: '/assets/df2bd8b6/3166933.svg?v=1621845549',
          srcMain: '/assets/df2bd8b6/3166932.svg?v=1621845549',
        },
        location: 'down',
        sortOrder: 100,
      },
    ],
    categoryColor: '#C5D7E5',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Длина' },
      { id: 41, groupId: 2, title: 'Ширина' },
      { id: 9, groupId: 2, title: 'Высота' },
    ],
    parameterValues: [
      { parameterId: 1, value: 200, unitId: 1, icon: '' },
      { parameterId: 41, value: 140, unitId: 1, icon: '' },
      { parameterId: 9, value: 2, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Топпер Слим 140x200' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 21475 },
        { itemprop: 'mpn', content: 21475 },
        { itemprop: 'name', content: 'Топпер Слим 140x200' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 2890 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/topper-slim-140x200' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 121420,
    modelId: 24068,
    type: 'Пуф',
    name: 'Гритон Textile Beige',
    link: '/product/puf-griton-textile-beige',
    price: { actual: 9990, expired: 11990, discount: 16 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/7lJUHfoHrPz_XHNBhjqkP6piZw4Bx1edg16C2SSQ11U/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2NDA2LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/6W_dJzvunqDYkLQWtGM3QgzsAjrwBkk7V7eX8GJPbUE/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2NDA0LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/RhfL32JFnwMz9heSisfUFsDMlQMW1eKQiImmWT2jRFQ/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2NDA1LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/I4JQ5PSlf0dbfZkbTPhYQDxdub5uCmJCYS5-Z4zypms/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2NDAyLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/U9Shk8VLmyu94dK-ZqWRsTaDIxfqlRzd64sYE3vQNdA/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2NDAzLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/Rg1mfTRs5Eyv5VHkmUru9wA0MoOxtv4BEsdVDFQgG1s/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMDc2NDA4LmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [],
    categoryColor: '#f1e67f',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Длина' },
      { id: 41, groupId: 2, title: 'Ширина' },
      { id: 9, groupId: 2, title: 'Высота' },
    ],
    parameterValues: [
      { parameterId: 1, value: 77, unitId: 1, icon: '' },
      { parameterId: 41, value: 86, unitId: 1, icon: '' },
      { parameterId: 9, value: 47, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Пуф Гритон Textile Beige' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 121420 },
        { itemprop: 'mpn', content: 121420 },
        { itemprop: 'name', content: 'Пуф Гритон Textile Beige' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 9990 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/puf-griton-textile-beige' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 129045,
    modelId: 105768,
    type: 'Журнальный стол',
    name: 'Гритон Dark',
    link: '/product/jurnalnyj-stol-griton-dark',
    price: { actual: 8990, expired: 0, discount: 0 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/sL4lxbA4-xcmCbmwgCQMulouZ0tgycItQS9NajNalUc/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNjI3OTk4LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/0fNpxsisnB8XyASqiFzyLOENQ9xpj-InE4K-XKXQD34/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNjI3OTk2LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/pEJRTVsBhKem4TO7teocdy6K1TmivBasNcW3TCM4IYE/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNjI3OTk3LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/PYRwRl8LaQ1S22tbhyByjxgBMWs06OWd-6eJ9FMBpxM/t:0::0:0/pd:66:64:66:64/rs:fit:272:168:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNjI3OTk1LmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [
      {
        title: 'Нажал/Открыл',
        image: {
          src: '/assets/476a5928/3167021.svg?v=1621846505',
          srcMain: '/assets/476a5928/3167020.svg?v=1621846505',
        },
        location: 'down',
        sortOrder: 220,
      },
    ],
    categoryColor: '#E7CFE0',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Ширина' },
      { id: 41, groupId: 2, title: 'Глубина' },
      { id: 9, groupId: 2, title: 'Высота' },
    ],
    parameterValues: [
      { parameterId: 1, value: 86, unitId: 1, icon: '' },
      { parameterId: 41, value: 60, unitId: 1, icon: '' },
      { parameterId: 9, value: 38, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Журнальный стол Гритон Dark' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 129045 },
        { itemprop: 'mpn', content: 129045 },
        { itemprop: 'name', content: 'Журнальный стол Гритон Dark' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 8990 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/jurnalnyj-stol-griton-dark' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 115447,
    modelId: 115486,
    type: 'ТВ-тумба',
    name: 'Окленд Дуб Ирландский',
    link: '/product/tv-tumba-oklend-dub-irlandskij',
    price: { actual: 9890, expired: 0, discount: 0 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/qIvebUFrmg42ZROmmjiByGTLisZjdr8TOCXhdzEXha4/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xODkwMDM0LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/ltMZ-YG-3ETA8njX6GqJuJ0cCI2fZwYh1daKu2ps7ak/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xODkwMDM3LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/_gaatlV8Oq5ulpOEga6TlJi-qTTp2tLllzHehI4Oidw/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xODkwMDM1LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/iVhkyoS5LGj5rBbp9Qt9w2sIHfoajNY5rnMWwXo9oFE/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xODkwMDM2LmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [
      {
        title: 'Товар участвует в акции',
        image: {
          src: '/assets/c3d0ce91/2582198.svg?v=1607585675',
          srcMain: '/assets/c3d0ce91/2582197.svg?v=1607585675',
        },
        location: 'down',
        sortOrder: 10,
      },
    ],
    categoryColor: '#E7CFE0',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Ширина' },
      { id: 41, groupId: 2, title: 'Глубина' },
      { id: 9, groupId: 2, title: 'Высота' },
    ],
    parameterValues: [
      { parameterId: 1, value: 131, unitId: 1, icon: '' },
      { parameterId: 41, value: 41, unitId: 1, icon: '' },
      { parameterId: 9, value: 53, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'ТВ-тумба Окленд Дуб Ирландский' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 115447 },
        { itemprop: 'mpn', content: 115447 },
        { itemprop: 'name', content: 'ТВ-тумба Окленд Дуб Ирландский' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 9890 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/tv-tumba-oklend-dub-irlandskij' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 127080,
    modelId: 127134,
    type: 'Ковер',
    name: 'Rabbit-Creme 120x170',
    link: '/product/kover-rabbit-creme-120x170',
    price: { actual: 12990, expired: 0, discount: 0 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/XI3n9xJXI4SaPeds-I6oWfdFbHREWBXZJU57umpYjUM/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNDU5NTY1LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/oRMe3iyf0Z25bUGmfBnHx-vMl4SKUjE3ByVlRyHlh3A/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNDU5NTY2LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/s_E2usdmJArii3yHXnpGBc9xx_s6TwX0mlkgQhVM1XU/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNDU5NTY3LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/pqOnm7o7uMJ6qYtYrtCtCO5LHshRdBO_XmeScFjPJcY/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNDU5NTcwLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/5luBbvOm4p8aZwcMAyb2AGnPbOJonJ46TJeCsv8NjFs/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNDU5NTY5LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/Nl17XWUt7jDKoZQt8FbiKSIbTuVdZMXKUa4m314gdys/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNDU5NTY4LmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [
      {
        title: 'Легкий уход',
        image: {
          src: '/assets/5d4b81f6/3167035.svg?v=1621846599',
          srcMain: '/assets/5d4b81f6/3167034.svg?v=1621846599',
        },
        location: 'down',
        sortOrder: 130,
      },
    ],
    categoryColor: '#91d1cf',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Длина' },
      { id: 41, groupId: 2, title: 'Ширина' },
    ],
    parameterValues: [
      { parameterId: 1, value: 170, unitId: 1, icon: '' },
      { parameterId: 41, value: 120, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Ковер Rabbit-Creme 120x170' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 127080 },
        { itemprop: 'mpn', content: 127080 },
        { itemprop: 'name', content: 'Ковер Rabbit-Creme 120x170' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 12990 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/kover-rabbit-creme-120x170' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 107403,
    modelId: 107408,
    type: 'Подлокотник',
    name: 'Реечный Венге',
    link: '/product/podlokotnik-reechnyj-venge',
    price: { actual: 1390, expired: 0, discount: 0 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/lU8h7g7a2cTR3P_78VNNSnx1GTDlm92sCZIl99O-sRg/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xMzQ0ODg4LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/iXIrvfSJo1OxVLefOCCv0iF7CNTTznI9ZsHS3ecHAW4/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xMzQ0ODg5LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/HiWuJhgfBpmgwTMdzDel6SgPrbr_37zdvZfp-3mc2L4/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xMzQ0ODkwLmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [
      {
        title: 'Доставка за 1 день',
        image: {
          src: '/assets/b9f6b2d8/1378222.svg?v=1573219294',
          srcMain: '/assets/677bf448/3166839.svg?v=1621844577',
        },
        location: 'down',
        sortOrder: 90,
      },
      {
        title: 'Есть в шоу-руме на Б. Переяславской<br>Есть в ТЦ «Румер»<br>Есть в МЦ «Комод»',
        image: {
          src: '/assets/2792a7cb/3166941.svg?v=1621845558',
          srcMain: '/assets/2792a7cb/3166940.svg?v=1621845558',
        },
        location: 'down',
        sortOrder: 100,
      },
    ],
    categoryColor: '#91d1cf',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Длина' },
      { id: 41, groupId: 2, title: 'Ширина' },
      { id: 9, groupId: 2, title: 'Высота' },
    ],
    parameterValues: [
      { parameterId: 1, value: 52, unitId: 1, icon: '' },
      { parameterId: 41, value: 37, unitId: 1, icon: '' },
      { parameterId: 9, value: 1, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Подлокотник Реечный Венге' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 107403 },
        { itemprop: 'mpn', content: 107403 },
        { itemprop: 'name', content: 'Подлокотник Реечный Венге' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 1390 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/podlokotnik-reechnyj-venge' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 132078,
    modelId: 132086,
    type: 'Плед',
    name: 'Линли Beach',
    link: '/product/pled-linli-beach',
    price: { actual: 3690, expired: 0, discount: 0 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/0trgi5fVijKpha1zNmvZhLN05E8elpk0HYu_knJOpsE/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8yNzkxOTE2LmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [
      {
        title: 'Доставка за 1 день',
        image: {
          src: '/assets/b9f6b2d8/1378222.svg?v=1573219294',
          srcMain: '/assets/677bf448/3166839.svg?v=1621844577',
        },
        location: 'down',
        sortOrder: 90,
      },
    ],
    categoryColor: '#91d1cf',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Длина' },
      { id: 41, groupId: 2, title: 'Ширина' },
    ],
    parameterValues: [
      { parameterId: 1, value: 180, unitId: 1, icon: '' },
      { parameterId: 41, value: 138, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Плед Линли Beach' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 132078 },
        { itemprop: 'mpn', content: 132078 },
        { itemprop: 'name', content: 'Плед Линли Beach' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 3690 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/pled-linli-beach' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 126879,
    modelId: 1793,
    type: 'Подушка',
    name: 'Деко 40х40 Diamond Beige',
    link: '/product/podushka-deko-40h40-diamond-beige',
    price: { actual: 1190, expired: 0, discount: 0 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/0ZDaS64xO51hOpl2zB4FMAlxItRC76qbGG0ldgofzuQ/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMzY2NDQ4LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/M-dm2oZEIxdPtmai_4EzjZIWsE8NAWT5m3DyhPWFcUY/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMzY2NTEwLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/20aQPDPW55BteJqSPdQMwnGk4zpLH-xzpdqsJXj8RtM/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMzY2NDQ5LmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/HFWQv2aVDCSF7CWDGnWUCoR5Hm9cm6BjfgqkuDJ1IlY/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8zMzY2NDUwLmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [
      {
        title: 'Новое предложение',
        image: {
          src: '/assets/d7295da/142062.svg?v=1493793807',
          srcMain: '/assets/53bfb6e8/4051.svg?v=1442835840',
        },
        location: 'up',
        sortOrder: 5,
      },
    ],
    categoryColor: '#91d1cf',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Длина' },
      { id: 41, groupId: 2, title: 'Ширина' },
    ],
    parameterValues: [
      { parameterId: 1, value: 40, unitId: 1, icon: '' },
      { parameterId: 41, value: 40, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Подушка Деко 40х40 Diamond Beige' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 126879 },
        { itemprop: 'mpn', content: 126879 },
        { itemprop: 'name', content: 'Подушка Деко 40х40 Diamond Beige' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 1190 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/podushka-deko-40h40-diamond-beige' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
  {
    id: 103046,
    modelId: 6890,
    type: 'Подушка',
    name: 'Гаага Sherst Light',
    link: '/product/podushka-gaaga-sherst-light',
    price: { actual: 1290, expired: 0, discount: 0 },
    images: [
      {
        src:
          'https://cdn.intranet.hhw.ru/YtfCW7_kTy5FULBE2xdhK0LAEBO0kfYVFz9TOTf_Vh4/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xMTI0MzEwLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/r2x3yRnOn62p7ZzCxbgR7OSu8Oz_7B5Hijl0_DwK4Fw/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xMTI0MzEzLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/dbzqPK6n2JflQelxQ-9tOesPAylr4GGxASitQf__vAA/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xMTI0MzExLmpwZw.jpg',
        orientation: 'landscape',
      },
      {
        src:
          'https://cdn.intranet.hhw.ru/pSTgMoE4r3e3QNIz0QHsTn9wT6HdF8ze845Olb1VZpQ/t:0::0:0/pd:13:24:13:24/rs:fit:352:274:1:1/g:ce:0:0/bg:f5f3f1/q:80/bG9jYWw6Ly8vcHJvZHVjdC8xMTI0MzEyLmpwZw.jpg',
        orientation: 'landscape',
      },
    ],
    miniature: false,
    tags: [
      {
        title: 'Доставка за 1 день',
        image: {
          src: '/assets/b9f6b2d8/1378222.svg?v=1573219294',
          srcMain: '/assets/677bf448/3166839.svg?v=1621844577',
        },
        location: 'down',
        sortOrder: 90,
      },
    ],
    categoryColor: '#91d1cf',
    parameterGroups: [{ id: 2, title: 'Размеры', theme: 'sizes' }],
    parameters: [
      { id: 1, groupId: 2, title: 'Длина' },
      { id: 41, groupId: 2, title: 'Ширина' },
    ],
    parameterValues: [
      { parameterId: 1, value: 52, unitId: 1, icon: '' },
      { parameterId: 41, value: 28, unitId: 1, icon: '' },
    ],
    units: [{ id: 1, title: ' см' }],
    rating: 0,
    meta: {
      product: [
        { itemprop: 'description', content: 'Подушка Гаага Sherst Light' },
        { itemprop: 'brand', content: 'Divan.ru' },
        { itemprop: 'sku', content: 103046 },
        { itemprop: 'mpn', content: 103046 },
        { itemprop: 'name', content: 'Подушка Гаага Sherst Light' },
      ],
      review: [{ itemprop: 'author', content: 'no name' }],
      aggregateRating: [
        { itemprop: 'ratingValue', content: '5' },
        { itemprop: 'reviewCount', content: '5' },
      ],
      offers: [
        { itemprop: 'price', content: 1290 },
        { itemprop: 'priceCurrency', content: 'RUB' },
        { itemprop: 'priceValidUntil', content: '2024-09-08' },
        { itemprop: 'url', content: '/product/podushka-gaaga-sherst-light' },
        { itemprop: 'availability', content: 'InStock' },
      ],
    },
    extraBonus: false,
  },
];

export const posts: InstagramPostData[] = [
  {
    id: '1334',
    img: '/assets/thumb/instagram/1936520/580x580_ffffff_100_1_2020061713570610800_80.jpg',
    link: 'https://www.instagram.com/p/CA-8HMxKCw9/',
    author: 'plastelinno',
    products: [
      {
        id: 45564,
        type: 'Пуф',
        name: 'Гритон Sherst Grey',
        img: '/assets/thumb/product/3076390/240x180_ffffff_100_0_2021042712530610800_80.jpg',
        link: '/product/puf-griton-sherst-grey',
        price: { actual: 9990, expired: 11990, discount: 16 },
      },
      {
        id: 5033,
        type: 'Диван',
        name: 'Динс Sherst Grey',
        img: '/assets/thumb/product/366283/240x180_ffffff_100_0_2018060407142610800_80.jpg',
        link: '/product/divan-dins-sherst-grey',
        price: { actual: 39990, expired: 39990, discount: 0 },
      },
    ],
  },
  {
    id: '302',
    img: '/assets/thumb/instagram/1798418/580x580_ffffff_100_1_2020050510060010800_80.jpg',
    link: 'https://www.instagram.com/p/B7D8f6GiXxQ',
    author: 'official_divan.ru',
    products: [
      {
        id: 86194,
        type: 'Кресло',
        name: 'Ньюбери 238',
        img: '/assets/thumb/product/2743622/240x180_ffffff_100_0_2021012611582310800_80.jpg',
        link: '/product/kreslo-nyuberi-238',
        price: { actual: 11990, expired: 12990, discount: 7 },
      },
      {
        id: 5032,
        type: 'Диван',
        name: 'Динс Sherst Blue',
        img: '/assets/thumb/product/366239/240x180_ffffff_100_0_2018060406524410800_80.jpg',
        link: '/product/divan-dins-sherst-blue',
        price: { actual: 39990, expired: 39990, discount: 0 },
      },
      {
        id: 86195,
        type: 'Пуф',
        name: 'Ньюбери 238',
        img: '/assets/thumb/product/3059481/240x180_ffffff_100_0_2021042311152810800_80.jpg',
        link: '/product/puf-nyuberi-238',
        price: { actual: 3990, expired: 3990, discount: 0 },
      },
    ],
  },
  {
    id: '145',
    img: '/assets/thumb/instagram/1782267/580x580_ffffff_100_1_2020042912230610800_80.jpg',
    link: 'https://www.instagram.com/p/B7-pATVhXqY',
    author: 'dianajenia',
    products: [
      {
        id: 21515,
        type: 'Пуф',
        name: 'Динс Velvet Yellow',
        img: '/assets/thumb/product/517090/240x180_ffffff_100_0_2018102411562110800_80.jpg',
        link: '/product/puf-dins-velvet-yellow',
        price: { actual: 6990, expired: 6990, discount: 0 },
      },
    ],
  },
  {
    id: '3229',
    img: '/assets/thumb/instagram/3126452/580x580_ffffff_100_1_2021051108275510800_80.jpg',
    link: 'https://www.instagram.com/p/CM7Zp5vFNtU/',
    author: 'nastavetrova',
    products: [],
  },
  {
    id: '3282',
    img: '/assets/thumb/instagram/3126581/580x580_ffffff_100_1_2021051108284310800_80.jpg',
    link: 'https://www.instagram.com/p/CNCoSPdjnC_/',
    author: 'aksy_home',
    products: [
      {
        id: 121960,
        type: 'Пуф',
        name: 'Ситено Velvet Ocean',
        img: '/assets/thumb/product/2300367/240x180_ffffff_100_0_2020093011560310800_80.jpg',
        link: '/product/puf-siteno-velvet-ocean',
        price: { actual: 5990, expired: 5990, discount: 0 },
      },
    ],
  },
  {
    id: '2143',
    img: '/assets/thumb/instagram/2871405/580x580_ffffff_100_1_2021030120525710800_80.jpg',
    link: 'https://www.instagram.com/p/CFrDJaBpDbo/',
    author: 'dania_kuznetsova',
    products: [
      {
        id: 20162,
        type: 'Пуф',
        name: 'Ньюбери 231',
        img: '/assets/thumb/product/460096/240x180_ffffff_100_0_2018091207164310800_80.jpg',
        link: '/product/puf-nyuberi-231',
        price: { actual: 3990, expired: 3990, discount: 0 },
      },
      {
        id: 20516,
        type: 'Кресло',
        name: 'Ньюбери 231',
        img: '/assets/thumb/product/471349/240x180_ffffff_100_0_2018092014351310800_80.jpg',
        link: '/product/kreslo-nyuberi-231',
        price: { actual: 11990, expired: 12990, discount: 7 },
      },
    ],
  },
  {
    id: '35',
    img: '/assets/thumb/instagram/1780228/580x580_ffffff_100_1_2020042820102510800_80.jpg',
    link: 'https://www.instagram.com/p/B8-rQuaIaXu',
    author: 'samwise_bengal',
    products: [],
  },
  {
    id: '3657',
    img: '/assets/thumb/instagram/3125658/580x580_ffffff_100_1_2021051108190710800_80.jpg',
    link: 'https://www.instagram.com/p/COUgVG_hhPD/',
    author: 'marinamalinovaya',
    products: [
      {
        id: 106707,
        type: 'Пуф',
        name: 'Плиди Sherst Grey',
        img: '/assets/thumb/product/1447580/240x180_ffffff_100_0_2019120613073310800_80.jpg',
        link: '/product/puf-plidi-sherst-grey',
        price: { actual: 4990, expired: 5990, discount: 16 },
      },
    ],
  },
  {
    id: '1177',
    img: '/assets/thumb/instagram/1800556/580x580_ffffff_100_1_2020050510454110800_80.jpg',
    link: 'https://www.instagram.com/p/B1YvU8xIPBh',
    author: 'elena.vlasova_home',
    products: [
      {
        id: 21515,
        type: 'Пуф',
        name: 'Динс Velvet Yellow',
        img: '/assets/thumb/product/517090/240x180_ffffff_100_0_2018102411562110800_80.jpg',
        link: '/product/puf-dins-velvet-yellow',
        price: { actual: 6990, expired: 6990, discount: 0 },
      },
      {
        id: 20304,
        type: 'Модульный диван',
        name: 'Динс Velvet Yellow',
        img: '/assets/thumb/product/466547/240x180_ffffff_100_0_2018091708525710800_80.jpg',
        link: '/product/modulnyj-divan-dins-velvet-yellow',
        price: { actual: 32970, expired: 32970, discount: 0 },
      },
    ],
  },
  {
    id: '1474',
    img: '/assets/thumb/instagram/2031945/580x580_ffffff_100_1_2020071705025610800_80.jpg',
    link: 'https://www.instagram.com/p/CCdoFPSqn56/',
    author: 'radar.dc',
    products: [],
  },
  {
    id: '47',
    img: '/assets/thumb/instagram/1782013/580x580_ffffff_100_1_2020042912191410800_80.jpg',
    link: 'https://www.instagram.com/p/B_jS9I8Dofd',
    author: 'ease.design_studio',
    products: [
      {
        id: 46634,
        type: 'Стул',
        name: 'Битл Velvet Pink',
        img: '/assets/thumb/product/809202/240x180_ffffff_100_0_2019030512475310800_80.jpg',
        link: '/product/stul-bitl-velvet-pink',
        price: { actual: 11990, expired: 15990, discount: 25 },
      },
    ],
  },
  {
    id: '2689',
    img: '/assets/thumb/instagram/2868070/580x580_ffffff_100_1_2021030109555510800_80.jpg',
    link: 'https://www.instagram.com/p/CKg9i-eFVWC/',
    author: 'elena.vlasova_home',
    products: [
      {
        id: 21515,
        type: 'Пуф',
        name: 'Динс Velvet Yellow',
        img: '/assets/thumb/product/517090/240x180_ffffff_100_0_2018102411562110800_80.jpg',
        link: '/product/puf-dins-velvet-yellow',
        price: { actual: 6990, expired: 6990, discount: 0 },
      },
      {
        id: 4884,
        type: 'Диван',
        name: 'Динс Velvet Yellow',
        img: '/assets/thumb/product/1918508/240x180_ffffff_100_0_2020061110095210800_80.jpg',
        link: '/product/divan-dins-velvet-yellow',
        price: { actual: 32990, expired: 39990, discount: 17 },
      },
    ],
  },
  {
    id: '2619',
    img: '/assets/thumb/instagram/2870598/580x580_ffffff_100_1_2021030120393610800_80.jpg',
    link: 'https://www.instagram.com/p/CKJvv0rjEGs/',
    author: 'affelandra',
    products: [
      {
        id: 20832,
        type: 'Пуф',
        name: 'Динс Sherst Grey',
        img: '/assets/thumb/product/486765/240x180_ffffff_100_0_2018100214442710800_80.jpg',
        link: '/product/puf-dins-sherst-grey',
        price: { actual: 6990, expired: 6990, discount: 0 },
      },
      {
        id: 5033,
        type: 'Диван',
        name: 'Динс Sherst Grey',
        img: '/assets/thumb/product/366283/240x180_ffffff_100_0_2018060407142610800_80.jpg',
        link: '/product/divan-dins-sherst-grey',
        price: { actual: 39990, expired: 39990, discount: 0 },
      },
    ],
  },
  {
    id: '1805',
    img: '/assets/thumb/instagram/2866609/580x580_ffffff_100_1_2021030109113810800_80.jpg',
    link: 'https://www.instagram.com/p/CGPywYVh90b/',
    author: 'verevochka.decor',
    products: [],
  },
  {
    id: '1182',
    img: '/assets/thumb/instagram/1800596/580x580_ffffff_100_1_2020050511004810800_80.jpg',
    link: 'https://www.instagram.com/p/B_zJHgVgN3h',
    author: 'elena.vlasova_home',
    products: [
      {
        id: 21515,
        type: 'Пуф',
        name: 'Динс Velvet Yellow',
        img: '/assets/thumb/product/517090/240x180_ffffff_100_0_2018102411562110800_80.jpg',
        link: '/product/puf-dins-velvet-yellow',
        price: { actual: 6990, expired: 6990, discount: 0 },
      },
      {
        id: 20304,
        type: 'Модульный диван',
        name: 'Динс Velvet Yellow',
        img: '/assets/thumb/product/466547/240x180_ffffff_100_0_2018091708525710800_80.jpg',
        link: '/product/modulnyj-divan-dins-velvet-yellow',
        price: { actual: 32970, expired: 32970, discount: 0 },
      },
    ],
  },
  {
    id: '3114',
    img: '/assets/thumb/instagram/2954693/580x580_ffffff_100_1_2021032607445210800_80.jpg',
    link: 'https://www.instagram.com/p/CMCvVoyiGck/',
    author: 'tanya__kai',
    products: [
      {
        id: 132586,
        type: 'Пуф',
        name: 'Кофи Velvet Emerald',
        img: '/assets/thumb/product/2816698/240x180_ffffff_100_0_2021021509082610800_80.jpg',
        link: '/product/puf-kofi-velvet-emerald',
        price: { actual: 2990, expired: 2990, discount: 0 },
      },
    ],
  },
  {
    id: '1383',
    img: '/assets/thumb/instagram/1952111/580x580_ffffff_100_1_2020062304330610800_80.jpg',
    link: 'https://www.instagram.com/p/CBv84JsqPsl/',
    author: 'ir.gn',
    products: [],
  },
  {
    id: '1990',
    img: '/assets/thumb/instagram/2871893/580x580_ffffff_100_1_2021030120595210800_80.jpg',
    link: 'https://www.instagram.com/p/CHLBaLMFyf8/',
    author: 'kati_tess.home',
    products: [
      {
        id: 17617,
        type: 'Пуф',
        name: 'Ньюбери 342',
        img: '/assets/thumb/product/946709/240x180_ffffff_100_0_2019041011544610800_80.jpg',
        link: '/product/puf-nyuberi-342',
        price: { actual: 3490, expired: 3490, discount: 0 },
      },
      {
        id: 17613,
        type: 'Кресло',
        name: 'Оксфорд 342',
        img: '/assets/thumb/product/362721/240x180_ffffff_100_0_2018053007480710800_80.jpg',
        link: '/product/kreslo-oksford-342',
        price: { actual: 12990, expired: 12990, discount: 0 },
      },
    ],
  },
  {
    id: '2416',
    img: '/assets/thumb/instagram/2871142/580x580_ffffff_100_1_2021030120473810800_80.jpg',
    link: 'https://www.instagram.com/p/CJGyll8lEKQ/',
    author: 'myremont_by',
    products: [
      {
        id: 17617,
        type: 'Пуф',
        name: 'Ньюбери 342',
        img: '/assets/thumb/product/946709/240x180_ffffff_100_0_2019041011544610800_80.jpg',
        link: '/product/puf-nyuberi-342',
        price: { actual: 3490, expired: 3490, discount: 0 },
      },
      {
        id: 17613,
        type: 'Кресло',
        name: 'Оксфорд 342',
        img: '/assets/thumb/product/362721/240x180_ffffff_100_0_2018053007480710800_80.jpg',
        link: '/product/kreslo-oksford-342',
        price: { actual: 12990, expired: 12990, discount: 0 },
      },
    ],
  },
  {
    id: '2483',
    img: '/assets/thumb/instagram/2870781/580x580_ffffff_100_1_2021030120430510800_80.jpg',
    link: 'https://www.instagram.com/p/CJTOQ20HBN8/',
    author: 'mrs.morzharetto',
    products: [
      {
        id: 114968,
        type: 'Диван',
        name: 'Кускен Velvet Yellow',
        img: '/assets/thumb/product/3035387/240x180_ffffff_100_0_2021041613282810800_80.jpg',
        link: '/product/divan-kusken-velvet-yellow',
        price: { actual: 38990, expired: 44990, discount: 13 },
      },
      {
        id: 114364,
        type: 'Пуф',
        name: 'Sweet Maral',
        img: '/assets/thumb/product/1822517/240x180_ffffff_100_0_2020051309573810800_80.jpg',
        link: '/product/puf-sweet-maral',
        price: { actual: 4390, expired: 5690, discount: 22 },
      },
    ],
  },
];

export const hits = {
  title: 'Мебель начинается с дивана',
  description:
    'В нашем интернет-магазине представлены только тщательно отобранные модели, исключительные диваны – хиты продаж в Москве и по России. Каждая модель дивана из нашего интернет каталога – это воплощение отличного дизайна, легенда мебельной отрасли.',
  products,
};

export const newProducts = {
  title: 'Новинки',
  description:
    'В нашем интернет-магазине представлены только тщательно отобранные модели, исключительные диваны – хиты продаж в Москве и по России. Каждая модель дивана из нашего интернет каталога – это воплощение отличного дизайна, легенда мебельной отрасли.',
  products,
};

export const popular: PopularData = {
  title: 'Популярные категории',
  products: [
    {
      id: 1544,
      title: 'Диваны',
      count: 4000,
      link: 'link',
      img: 'react/static/popularImages/image_1.png',
      price: 14350,
    },
    {
      id: 1545,
      title: 'Текстиль',
      count: 5,
      link: 'link',
      img: 'react/static/popularImages/image_2.png',
      price: 2490,
    },
    {
      id: 1546,
      title: 'Аксессуары',
      count: 193,
      link: 'link',
      img: 'react/static/popularImages/image_3.png',
      price: 1300,
    },
    {
      id: 1547,
      title: 'Кухни',
      count: 400,
      link: 'link',
      img: 'react/static/popularImages/image_4.png',
      price: 2490,
    },
    {
      id: 1548,
      title: 'Гостиная',
      count: 193,
      link: 'link',
      img: 'react/static/popularImages/image_5.png',
      price: 1300,
    },
    {
      id: 1549,
      title: 'Шкафы',
      count: 203,
      link: 'link',
      img: 'react/static/popularImages/image_6.png',
      price: 15000,
    },
    {
      id: 1550,
      title: 'Диваны',
      count: 4000,
      link: 'link',
      img: 'react/static/popularImages/image_1.png',
      price: 14350,
    },
    {
      id: 1551,
      title: 'Текстиль',
      count: 5,
      link: 'link',
      img: 'react/static/popularImages/image_2.png',
      price: 2490,
    },
    {
      id: 1552,
      title: 'Аксессуары',
      count: 193,
      link: 'link',
      img: 'react/static/popularImages/image_3.png',
      price: 1300,
    },
    {
      id: 1553,
      title: 'Кухни',
      count: 400,
      link: 'link',
      img: 'react/static/popularImages/image_4.png',
      price: 2490,
    },
    {
      id: 1554,
      title: 'Гостиная',
      count: 193,
      link: 'link',
      img: 'react/static/popularImages/image_5.png',
      price: 1300,
    },
    {
      id: 1555,
      title: 'Шкафы',
      count: 203,
      link: 'link',
      img: 'react/static/popularImages/image_6.png',
      price: 15000,
    },
  ],
};

export const sliderData: MainSliderData[] = [
  {
    id: 130,
    period: '1 - 11 мая',
    header: 'Мягкая мебель в весенних оттенках со скидкой до 30%*',
    subtitle: 'Скидки на товары из конструктора до -30%',
    textLink: 'Узнать больше',
    link: 'link',
    dateEnd: 1631436300,
    images: {
      mobile: 'react/static/img/MainSlider/banner_mobile.png',
      desktop: 'react/static/img/MainSlider/banner.png',
    },
  },
  {
    id: 135,
    // period: '1 - 11 мая',
    header: 'Мягкая мебель в весенних оттенках со скидкой до 30%*',
    textLink: 'Узнать больше',
    link: 'link',
    dateEnd: 1631944800,
    images: {
      mobile: 'react/static/img/MainSlider/banner_mobile.png',
      desktop: 'react/static/img/MainSlider/banner.png',
    },
  },
  {
    id: 150,
    period: '1 - 11 мая',
    header: 'Мягкая мебель в весенних оттенках со скидкой до 30%*',
    subtitle: 'Скидки на товары из конструктора до -30%',
    textLink: 'Узнать больше',
    link: 'link',
    dateEnd: 1631436300,
    images: {
      mobile: 'react/static/img/MainSlider/banner_mobile.png',
      desktop: 'react/static/img/MainSlider/banner.png',
    },
  },
];
