import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './Hits.module.css';

export interface HitsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  description?: string;
}

const Hits: FC<HitsProps> = ({ description, title, className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title || 'Мебель начинается с дивана'}</p>
      <p className={styles.description}>
        {description ||
          'В нашем интернет-магазине представлены только тщательно отобранные модели, исключительные\n' +
            ' диваны – хиты продаж в Москве и по России. Каждая модель дивана из нашего интернет каталога\n' +
            ' – это воплощение отличного дизайна, легенда мебельной отрасли.'}
      </p>
    </div>
  );
};

export default memo(Hits);
