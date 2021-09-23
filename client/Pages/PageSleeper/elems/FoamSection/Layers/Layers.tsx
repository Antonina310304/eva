import React, { FC, memo, useCallback, useState } from 'react';

import cn from 'classnames';
import styles from './Layers.module.css';

const LayersData = [
  {
    title: 'Anatomic Foam',
    text:
      'Верхний слой — 3 см дышащей анатомической пены с вкраплениями экологичного охлаждающего геля.',
  },
  {
    title: 'Adaptive Foam',
    text:
      '4 см пены повышенной жесткости с содержанием натурального угля бамбука и антисептическими свойствами.',
  },
  {
    title: 'Sleeper Foam',
    text:
      'Базовый слой — 14 см высокоэластичного наполнителя, пористого и влагоустойчивого, готового к продолжительным нагрузкам.',
  },
  {
    title: 'Внешний чехол',
    text:
      'Поверхность для сна из мягкого дышащего трикотажа и боковины из фактурной рогожки — практичность и комфорт 2 в 1.',
  },
];

const Layers: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <div>
      <div>Слои с анимацией</div>
      <button type='button' onClick={handleClick}>
        показать
      </button>
      <div className={styles.wrapper}>
        <div className={cn(isOpen && styles.open, styles.layers)}>
          <div className={styles.inner}>
            <div className={cn(styles.layer, styles.layer_1)} />
            <div className={cn(styles.layer, styles.layer_2)} />
            <div className={cn(styles.layer, styles.layer_3)} />
            <div className={cn(styles.layer, styles.layer_4)} />
          </div>
        </div>
        <div className={cn(isOpen && styles.open, styles.description)}>
          {LayersData.map((item) => (
            <div className={styles.descriptionItem}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Layers);
