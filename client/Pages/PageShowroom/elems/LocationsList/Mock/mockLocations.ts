import { SellPointData } from '@Pages/PageB2b/typings';

const mockPickupPoints: SellPointData[] = [
  {
    id: 'showroom_empire',
    regionId: 1,
    coordinates: [55.905494, 37.539279],
    name: 'МЦ «Империя»',
    address:
      '<span class="word">г. Москва,</span> <span class="word">Дмитровское шоссе,</span> <span class="word">161 б,</span> <span class="word">1 этаж,</span> <span class="word">МЦ «Империя»</span>',
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

export default mockPickupPoints;
