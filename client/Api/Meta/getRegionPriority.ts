import { Api } from '@Api/index';

export type Result = any;

const fakeData = {
  status: 'success',
  data: [
    { id: 1, name: 'Москва', parent_id: 1, flagman: true },
    { id: 2, name: 'Санкт-Петербург', parent_id: 2, flagman: true },
    { id: 11, name: 'Краснодар', parent_id: 11, flagman: true },
    { id: 3, name: 'Владимир', parent_id: 3, flagman: false },
    { id: 12, name: 'Воронеж', parent_id: 12, flagman: false },
    { id: 40, name: 'Екатеринбург', parent_id: 40, flagman: false },
    { id: 33, name: 'Казань', parent_id: 33, flagman: false },
    { id: 10, name: 'Калуга', parent_id: 10, flagman: false },
    { id: 44, name: 'Нижний Новгород', parent_id: 44, flagman: false },
    { id: 37, name: 'Пермь', parent_id: 37, flagman: false },
    { id: 13, name: 'Ростов-на-Дону', parent_id: 13, flagman: false },
    { id: 5, name: 'Рязань', parent_id: 5, flagman: false },
    { id: 7, name: 'Тверь', parent_id: 7, flagman: false },
    { id: 30, name: 'Тольятти', parent_id: 30, flagman: false },
    { id: 6, name: 'Тула', parent_id: 6, flagman: false },
    { id: 41, name: 'Тюмень', parent_id: 41, flagman: false },
    { id: 42, name: 'Уфа', parent_id: 42, flagman: false },
    { id: 38, name: 'Челябинск', parent_id: 38, flagman: false },
    { id: 8, name: 'Ярославль', parent_id: 8, flagman: false },
  ],
};

// TODO: временно отдаем фейковые данные из-за проблем с реальным запросом на бэкенде
export default async (): Promise<Result> => {
  return Promise.resolve(fakeData.data);

  // const res = await Api.queryProxi<Result>('/region-priority');

  // if (res?.status === 'success') return Promise.reject(res);

  // return res.data;
};
