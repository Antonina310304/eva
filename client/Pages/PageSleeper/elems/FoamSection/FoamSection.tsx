import React, { FC, memo } from 'react';
import styles from './FoamSection.module.css';

const text = [
  {
    title: 'Пена с эффектом памяти',
    description:
      'Anatomic Foam нежно повторяет контуры тела и поддерживает позвоночник в правильном положении. Особая пористая текстура мягко обволакивает и окружает комфортом со всех сторон, снимает напряжение мышц спины и шеи, дарит ощущение сна в невесомости.',
  },
  {
    title: 'Удобный съемный чехол',
    description:
      'Нежная, приятная на ощупь поверхность матраса Sleeper — качественный трикотаж American Lady Border, гарантирует прекрасный воздухообмен. Боковины выполнены из рогожки Kiton. Благодаря застежке-молнии, предусмотренной по периметру чехла, его легко снять. Рекомендуем ручную или машинную стирку в деликатном режиме.',
  },
];

const firstImg = 'react/static/img/sleeper/foamSection/bottomBlock1.png';
const secondImg = 'react/static/img/sleeper/foamSection/bottomBlock2.png';

const FoamSection: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topBlock}>Три слоя инновационной пены для безупречного комфорта</div>

      <div className={styles.bottomBlock}>
        <div className={styles.bottomBlock_firstLine}>
          <div className={styles.bottomBlock_textWrapper}>
            <div className={styles.bottomBlock_title}>{text[0].title}</div>
            <div className={styles.bottomBlock_description}>{text[0].description}</div>
          </div>
          <img className={styles.bottomBlock_img} src={firstImg} />
        </div>

        <div className={styles.bottomBlock_secondLine}>
          <img className={styles.bottomBlock_img} src={secondImg} />
          <div className={styles.bottomBlock_textWrapper}>
            <div className={styles.bottomBlock_title}>{text[1].title}</div>
            <div className={styles.bottomBlock_description}>{text[1].description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FoamSection);
