import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import { NewsItemData } from '@Types/Press';
import Image from '@UI/Image';
import styles from './NewsItem.module.css';

export interface NewsItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  article: NewsItemData;
}

const NewsItem: FC<NewsItemProps> = (props) => {
  const { className, article, ...restProps } = props;

  const handleClick = useCallback(() => {}, []);

  return (
    <div {...restProps} className={cn(styles.article, className)} onClick={handleClick}>
      <Image src={article.images[0].src} className={styles.image}>
        <Image src={article.logo} className={styles.logo} />
      </Image>
      <div className={styles.title}>{article.preview}</div>
    </div>
  );
};

export default memo(NewsItem);
