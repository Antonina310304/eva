const mockFiltrator = {
  id: '/vladimir/category/divany-i-kresladivany-i-kresla',
  filters: [
    {
      name: 'Цена',
      theme: 'single-range',
      items: [
        {
          theme: 'range',
          parameterId: 'prices',
        },
      ],
    },
    {
      name: 'Размеры',
      theme: 'several-range',
      items: [
        {
          theme: 'range',
          parameterId: '1',
        },
        {
          theme: 'range',
          parameterId: '41',
        },
        {
          theme: 'range',
          parameterId: '9',
        },
      ],
    },
    {
      name: 'Спальное место',
      theme: 'several-range',
      items: [
        {
          theme: 'range',
          parameterId: '3',
        },
        {
          theme: 'range',
          parameterId: '4',
        },
      ],
    },
    {
      name: 'Тип товара',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: 'types',
        },
      ],
    },
    {
      name: 'Конфигурация',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '187',
        },
      ],
    },
    {
      name: 'Цвет',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '40',
        },
      ],
    },
    {
      name: 'Преимущества',
      theme: 'tags',
      items: [
        {
          theme: 'checkbox',
          parameterId: 'tags',
        },
      ],
    },
    {
      name: 'Стиль',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '147',
        },
      ],
    },
    {
      name: 'Механизм',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '5',
        },
      ],
    },
    {
      name: 'Наполнение',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '14',
        },
      ],
    },
    {
      name: 'Тип обивки',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '175',
        },
      ],
    },
    {
      name: 'Подлокотники',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '184',
        },
      ],
    },
    {
      name: 'Бельевой ящик',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '181',
        },
      ],
    },
    {
      name: 'Декоративные подушки',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '189',
        },
      ],
    },
    {
      name: 'Съемный чехол',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '188',
        },
      ],
    },
    {
      name: 'Количество посадочных мест',
      theme: 'checkbox',
      items: [
        {
          theme: 'checkbox',
          parameterId: '190',
        },
      ],
    },
  ],
  parameters: {
    '1': {
      name: 'Длина',
      unit: ' см',
      default: [34, 403],
    },
    '3': {
      name: 'Длина',
      unit: ' см',
      default: [127, 301],
    },
    '4': {
      name: 'Ширина',
      unit: ' см',
      default: [55, 162],
    },
    '5': {
      name: 'Механизм',
      unit: '',
      default: [],
    },
    '9': {
      name: 'Высота',
      unit: ' см',
      default: [30, 140],
    },
    '14': {
      name: 'Наполнение',
      unit: '',
      default: [],
    },
    '40': {
      name: 'Цвет',
      unit: '',
      default: [],
    },
    '41': {
      name: 'Ширина',
      unit: ' см',
      default: [35, 223],
    },
    '147': {
      name: 'Стиль',
      unit: '',
      default: [],
    },
    '175': {
      name: 'Тип обивки',
      unit: '',
      default: [],
    },
    '181': {
      name: 'Бельевой ящик',
      unit: '',
      default: [],
    },
    '184': {
      name: 'Подлокотники',
      unit: '',
      default: [],
    },
    '187': {
      name: 'Конфигурация',
      unit: '',
      default: [],
    },
    '188': {
      name: 'Съемный чехол',
      unit: '',
      default: [],
    },
    '189': {
      name: 'Декоративные подушки',
      unit: '',
      default: [],
    },
    '190': {
      name: 'Количество посадочных мест',
      unit: '',
      default: [],
    },
    prices: {
      name: 'Цена',
      unit: 'руб.',
      default: [2390, 161930],
    },
    types: {
      name: 'Тип товара',
      unit: '',
      default: [],
    },
    tags: {
      name: 'Преимущества',
      unit: '',
      default: [],
    },
  },
  parameterValues: [
    {
      parameterId: 'prices',
      type: 'range',
      name: '',
      value: [2390, 161930],
      meta: {
        step: 1,
      },
    },
    {
      parameterId: '1',
      type: 'range',
      name: '',
      value: [34, 403],
      meta: {
        step: 1,
      },
    },
    {
      parameterId: '41',
      type: 'range',
      name: '',
      value: [35, 223],
      meta: {
        step: 1,
      },
    },
    {
      parameterId: '9',
      type: 'range',
      name: '',
      value: [30, 140],
      meta: {
        step: 1,
      },
    },
    {
      parameterId: '3',
      type: 'range',
      name: '',
      value: [127, 301],
      meta: {
        step: 1,
      },
    },
    {
      parameterId: '4',
      type: 'range',
      name: '',
      value: [55, 162],
      meta: {
        step: 1,
      },
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Банкетка',
      value: [94],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Диван',
      value: [1],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Диван угловой',
      value: [4],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Канапе',
      value: [56],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Кресло',
      value: [37],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Кресло-качалка',
      value: [178],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Кресло-кровать',
      value: [53],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Кресло-мешок',
      value: [141],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Кресло-реклайнер',
      value: [206],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Кушетка',
      value: [96],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Модульный диван',
      value: [54],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Пуф',
      value: [58],
      meta: [],
    },
    {
      parameterId: 'types',
      type: 'variant',
      name: 'Угловое кресло',
      value: [67],
      meta: [],
    },
    {
      parameterId: '187',
      type: 'variant',
      name: 'П-образный',
      value: [4918],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '187',
      type: 'variant',
      name: 'Прямой',
      value: [4916],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '187',
      type: 'variant',
      name: 'Угловой',
      value: [4917],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Бежевый',
      value: [1316],
      meta: {
        color: '#e4bb99',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Белый',
      value: [350],
      meta: {
        color: '#ffffff',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Голубой',
      value: [349],
      meta: {
        color: '#6fa8dc',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Желтый',
      value: [358],
      meta: {
        color: '#ffd966',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Зеленый',
      value: [355],
      meta: {
        color: '#6aa84f',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Коричневый',
      value: [342],
      meta: {
        color: '#40200a',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Красный',
      value: [348],
      meta: {
        color: '#cc0000',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Оранжевый',
      value: [357],
      meta: {
        color: '#ff9900',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Розовый',
      value: [347],
      meta: {
        color: '#ea9999',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Серый',
      value: [344],
      meta: {
        color: '#cccccc',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Синий',
      value: [346],
      meta: {
        color: '#1c4587',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Фиолетовый',
      value: [356],
      meta: {
        color: '#9900ff',
      },
    },
    {
      parameterId: '40',
      type: 'variant',
      name: 'Черный',
      value: [345],
      meta: {
        color: '#000000',
      },
    },
    {
      parameterId: 'tags',
      type: 'variant',
      name: 'Новое предложение',
      value: [2],
      meta: [],
      isProduct: false,
    },
    {
      parameterId: 'tags',
      type: 'variant',
      name: 'В наличии',
      value: [5],
      meta: [],
      isProduct: false,
    },
    {
      parameterId: 'tags',
      type: 'variant',
      name: 'Легкий уход',
      value: [18],
      meta: [],
      isProduct: false,
    },
    {
      parameterId: 'tags',
      type: 'variant',
      name: 'Натуральная кожа',
      value: [16],
      meta: [],
      isProduct: false,
    },
    {
      parameterId: 'tags',
      type: 'variant',
      name: 'Pet-friendly',
      value: [17],
      meta: [],
      isProduct: false,
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Винтаж',
      value: [3823],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Кантри',
      value: [3775],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Классический',
      value: [3543],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Лофт',
      value: [3563],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Минимализм',
      value: [3546],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Модерн',
      value: [3738],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Прованс',
      value: [3547],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Скандинавский',
      value: [3544],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Современный',
      value: [3562],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '147',
      type: 'variant',
      name: 'Хай-тек',
      value: [3545],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Аккордеон',
      value: [23],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Барон',
      value: [2608],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Без механизма',
      value: [369],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Выкатной',
      value: [1564],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Гостевой вариант',
      value: [21520],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Двухсекционный МТД',
      value: [19959],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Дельфин',
      value: [2],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Еврокнижка',
      value: [1],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Клик-кляк',
      value: [917],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Книжка',
      value: [107],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Конрад',
      value: [3397],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Моносекционный МТД',
      value: [21694],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Односекционный МТД',
      value: [20771],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Пантограф',
      value: [22],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Пума',
      value: [21],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Раскладные подлокотники',
      value: [19391],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Реклайнер',
      value: [21819],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Улитка',
      value: [19998],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '5',
      type: 'variant',
      name: 'Французская раскладушка',
      value: [1264],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'ППУ Elax Medium',
      value: [20527],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'ППУ HR повышенной комфортности',
      value: [44],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'ППУ HS повышенной комфортности',
      value: [6776],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'ППУ HS повышенной комфортности, синтепон',
      value: [21389],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'ППУ ST стандартный',
      value: [19273],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'ППУ ST, периотек',
      value: [20226],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'ППУ, холлкон',
      value: [3351],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'ППУ, холлофайбер',
      value: [19174],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Высокоэластичный ППУ',
      value: [398],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Зависимый пружинный блок',
      value: [12],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Зависимый пружинный блок, ППУ ST',
      value: [21542],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Зависимый пружинный блок, ППУ ST, периотек',
      value: [21778],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Независимый пружинный блок',
      value: [13],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Независимый пружинный блок, ППУ Elax Medium',
      value: [21809],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Независимый пружинный блок, ППУ ST стандартный, периотек',
      value: [20193],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Независимый пружинный блок, ППУ memory foam',
      value: [19102],
      meta: [],
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Пружинная змейка, ППУ',
      value: [483],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Шарики пенополистирола',
      value: [3735],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '14',
      type: 'variant',
      name: 'Шарики пенополистирола, холлофайбер',
      value: [21592],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '175',
      type: 'variant',
      name: 'Натуральная кожа',
      value: [4260],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '175',
      type: 'variant',
      name: 'Ткань',
      value: [4258],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '175',
      type: 'variant',
      name: 'Экокожа',
      value: [4259],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '184',
      type: 'variant',
      name: 'Да',
      value: [4697],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '184',
      type: 'variant',
      name: 'Нет',
      value: [4698],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '181',
      type: 'variant',
      name: 'Да',
      value: [4692],
      meta: [],
    },
    {
      parameterId: '181',
      type: 'variant',
      name: 'Нет',
      value: [4627],
      meta: [],
    },
    {
      parameterId: '189',
      type: 'variant',
      name: 'Да',
      value: [4939],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '189',
      type: 'variant',
      name: 'Нет',
      value: [4940],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '188',
      type: 'variant',
      name: 'Да',
      value: [4926],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '188',
      type: 'variant',
      name: 'Нет',
      value: [4927],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '190',
      type: 'variant',
      name: '1',
      value: [4943],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '190',
      type: 'variant',
      name: '2',
      value: [4944],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '190',
      type: 'variant',
      name: '3',
      value: [4945],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '190',
      type: 'variant',
      name: '4',
      value: [4946],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '190',
      type: 'variant',
      name: '5',
      value: [4947],
      meta: {
        color: '',
      },
    },
    {
      parameterId: '190',
      type: 'variant',
      name: '6',
      value: [4948],
      meta: {
        color: '',
      },
    },
  ],
  sort: [
    {
      id: 0,
      name: 'самые популярные',
      selected: true,
    },
    {
      id: 1,
      name: 'самые дешевые',
      selected: false,
    },
    {
      id: 2,
      name: 'самые дорогие',
      selected: false,
    },
  ],
  totalCount: 0,
  tabs: [
    {
      name: 'Цена',
      theme: 'single-range',
    },
    {
      name: 'Размеры',
      theme: 'several-range',
    },
    {
      name: 'Спальное место',
      theme: 'several-range',
    },
    {
      name: 'Тип товара',
      theme: 'checkbox',
    },
    {
      name: 'Конфигурация',
      theme: 'checkbox',
    },
    {
      name: 'Цвет',
      theme: 'checkbox',
    },
    {
      name: 'Преимущества',
      theme: 'tags',
    },
    {
      name: 'Стиль',
      theme: 'checkbox',
    },
    {
      name: 'Механизм',
      theme: 'checkbox',
    },
    {
      name: 'Наполнение',
      theme: 'checkbox',
    },
    {
      name: 'Тип обивки',
      theme: 'checkbox',
    },
    {
      name: 'Подлокотники',
      theme: 'checkbox',
    },
    {
      name: 'Бельевой ящик',
      theme: 'checkbox',
    },
    {
      name: 'Декоративные подушки',
      theme: 'checkbox',
    },
    {
      name: 'Съемный чехол',
      theme: 'checkbox',
    },
    {
      name: 'Количество посадочных мест',
      theme: 'checkbox',
    },
  ],
  selected: {
    filters: [],
    parameterValues: [],
    parameters: {},
    sort: [
      {
        id: 0,
        name: 'самые популярные',
        selected: true,
      },
      {
        id: 1,
        name: 'самые дешевые',
        selected: false,
      },
      {
        id: 2,
        name: 'самые дорогие',
        selected: false,
      },
    ],
  },
};

export default mockFiltrator;
