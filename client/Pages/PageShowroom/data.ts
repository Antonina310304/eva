import { SellPointData } from '@Pages/PageB2b/typings';

export const map = {
  center: [55.751574, 37.573856],
  zoom: 9,
  title: 'Лучше один раз увидеть!',
  description:
    'Мы предлагаем самый актуальный ассортимент на сегодня и предоставляем клиентам все возможности быть уверенными в покупке. Приглашаем посетить фирменные шоу-румы и лично оценить качество используемых тканей и материалов, проверить комфортность наполнения и работы механизмов, убедиться в удобстве и надежности нашей мебели!',
  regionId: 1,
};

const pickupPoints: SellPointData[] = [
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
      '/react/static/img/showroom/x_ffffff_100_0_2019011411100410800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411101610800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411105210800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411111110800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411093510800_80.jpg',
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
      '/react/static/img/showroom/x_ffffff_100_0_2019011411093510800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411100410800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411101610800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411105210800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411111110800_80.jpg',
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
      '/react/static/img/showroom/x_ffffff_100_0_2019011411101610800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411100410800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411093510800_80.jpg',
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
      '/react/static/img/showroom/x_ffffff_100_0_2019011411105210800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411101610800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411100410800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411101610800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411111110800_80.jpg',
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
      '/react/static/img/showroom/x_ffffff_100_0_2019011411093510800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411100410800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411111110800_80.jpg',
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
      '/react/static/img/showroom/x_ffffff_100_0_2019011411100410800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411101610800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411105210800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411111110800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411100410800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411101610800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411105210800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411111110800_80.jpg',
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
      '/react/static/img/showroom/x_ffffff_100_0_2019011411093510800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411100410800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411101610800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411105210800_80.jpg',
      '/react/static/img/showroom/x_ffffff_100_0_2019011411111110800_80.jpg',
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
    images: [],
  },
];

export default pickupPoints;
