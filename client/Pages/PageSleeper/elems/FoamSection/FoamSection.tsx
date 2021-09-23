import React, { FC, memo } from 'react';

import SleeperFeatures from '@Pages/PageSleeper/elems/FoamSection/SleeperFeatures/SleeperFeatures';
import Layers from './Layers';
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
      <div className={styles.headContainer}>
        <h2 className={styles.title}>Три слоя инновационной пены для безупречного комфорта</h2>
        <div className={styles.description}>
          Несколько циклов тестирования помогли нам найти идеальное наполнение для матраса Sleeper.
          На первый взгляд кажется, что все просто. Однако внутри — тщательно продуманная комбинация
          трех инновационных материалов.
        </div>
      </div>
      <Layers />
      <SleeperFeatures features={sleeperFeatures} />
    </div>
  );
};

export default memo(FoamSection);
