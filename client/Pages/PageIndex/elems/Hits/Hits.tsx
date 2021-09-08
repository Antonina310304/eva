import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './Hits.module.css';

export interface HitsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Hits: FC<HitsProps> = ({ className }) => {
  return (
    <div className={cn(className, styles.hits)}>
      <p>Мебель начинается с дивана</p>
      <p>
        В нашем интернет-магазине представлены только тщательно отобранные модели, исключительные
        диваны – хиты продаж в Москве и по России. Каждая модель дивана из нашего интернет каталога
        – это воплощение отличного дизайна, легенда мебельной отрасли.
      </p>
    </div>
  );
};

export default memo(Hits);
