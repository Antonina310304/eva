import React, { FC, memo } from 'react';

import SleeperFeatures from '@Pages/PageSleeper/elems/FoamSection/SleeperFeatures/SleeperFeatures';
import styles from './FoamSection.module.css';

const sleeperFeatures = [
  {
    name: 'Пена с эффектом памяти',
    description:
      'Anatomic Foam нежно повторяет контуры тела и поддерживает позвоночник в правильном положении. Особая пористая текстура мягко обволакивает и окружает комфортом со всех сторон, снимает напряжение мышц спины и шеи, дарит ощущение сна в невесомости.',
    image: 'react/static/img/sleeper/foamSection/bottomBlock1.png',
  },
  {
    name: 'Удобный съемный чехол',
    description:
      'Нежная, приятная на ощупь поверхность матраса Sleeper — качественный трикотаж American Lady Border, гарантирует прекрасный воздухообмен. Боковины выполнены из рогожки Kiton. Благодаря застежке-молнии, предусмотренной по периметру чехла, его легко снять. Рекомендуем ручную или машинную стирку в деликатном режиме.',
    image: 'react/static/img/sleeper/foamSection/bottomBlock2.png',
  },
];

const FoamSection: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topBlock}>Три слоя инновационной пены для безупречного комфорта</div>

      <SleeperFeatures features={sleeperFeatures} />
    </div>
  );
};

export default memo(FoamSection);
