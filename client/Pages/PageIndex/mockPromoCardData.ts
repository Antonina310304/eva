import { PromoCardProps } from '@Components/PromoCard';

const mockPromoCardData: PromoCardProps[] = [
  {
    type: 'event',
    title: 'Ультрамодные фасады',
    description: 'Серии Монблан и Теджонс со скидками до 20%',
    period: '17 - 26&nbsp;августа',
    bgImage: '/react/static/promoCards/promo.jpg',
    discount: 'до 50%',
    theme: 'light',
  },
  {
    type: 'service',
    title: 'Образцы тканей',
    description: 'Закажите понравившиеся варианты, и курьер привезёт их по нужному адресу',
    bgImage: '/react/static/promoCards/promo2.svg',
    bgColor: '#F4FFC0',
    theme: 'light',
    buttonText: 'Заказать образцы',
    buttonEvent: 'sampleOrder',
  },
  {
    type: 'event',
    title: 'Атмосфера знаний и творчества!',
    description: 'Атмосфера знаний и творчества!',
    period: '30&nbsp;июля - 15&nbsp;сентября',
    bgImage: '/react/static/promoCards/promo3.jpg',
    discount: 'до 50%',
    theme: 'light',
  },
  {
    type: 'event',
    title: 'Ликвидация',
    description: 'Последние модели в коллекции!',
    period: '3 - 10&nbsp;мая',
    bgImage: '/react/static/promoCards/promo4.jpg',
    discount: 'до 50%',
    theme: 'dark',
  },
  {
    type: 'service',
    title: 'Доставка за наш счет',
    description: 'Привезём бесплатно при заказе от&nbsp;45&nbsp;000&nbsp;₽',
    bgImage: '/react/static/promoCards/promo5.svg',
    bgColor: '#FFD9E0',
    theme: 'light',
  },
  {
    type: 'event',
    title: 'Товар недели',
    description: 'Стул «Албер White»',
    period: '3 - 10&nbsp;мая',
    bgImage: '/react/static/promoCards/promo6.png',
    bgColor: '#D8F1F1',
    discount: 'до 50%',
    theme: 'light',
  },
  {
    type: 'event',
    title: 'Когда все в сборе!',
    description: 'Большие диваны со скидками до -35%',
    period: '3 - 10&nbsp;мая',
    bgImage: '/react/static/promoCards/promo7.jpg',
    discount: 'до 50%',
    theme: 'light',
  },
  {
    type: 'service',
    title: 'Видеоконсультация со специалистом',
    description: 'Поможем, расскажем, покажем вживую',
    bgImage: '/react/static/promoCards/promo8.svg',
    bgColor: '#D8F1F1',
    buttonText: 'Отправить заявку',
    buttonEvent: 'videoConsultation',
    theme: 'light',
  },
  {
    type: 'event',
    title: 'Будь в тренде!',
    description: 'Скидки на главные актуальные новинки до -40%',
    period: '3 - 10&nbsp;мая',
    bgImage: '/react/static/promoCards/promo9.jpg',
    discount: 'до 50%',
    theme: 'dark',
  },
  {
    type: 'event',
    title: 'Добавь цвета!',
    description: 'Яркая мебель со скидками до –40%',
    period: '1 - 10&nbsp;июня',
    bgImage: '/react/static/promoCards/promo10.jpg',
    discount: 'до 50%',
    theme: 'light',
  },
];

export default mockPromoCardData;
