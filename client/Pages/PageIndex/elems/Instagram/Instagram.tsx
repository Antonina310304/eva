import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './Instagram.module.css';

export interface InstagramProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  description?: string;
}

const Instagram: FC<InstagramProps> = ({ className, title, description }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <p className={styles.title}>{title || 'Ищите вдохновение в инстаграм @official_divan.ru'}</p>
      <p>
        {description ||
          'Cтилизуете интерьер вместе с Divan.ru – отмечайте @official_divan.ru на фото в своем аккаунте Instagram, \n' +
            'добавляйте хештег #купилвдиванру. Мы публикуем лучшие кадры.'}
      </p>
    </div>
  );
};

export default memo(Instagram);
