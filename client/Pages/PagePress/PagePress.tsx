import React, { FC, HTMLAttributes, memo, useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import List from '@UI/List';
import Button from '@UI/Button';
import InformationTabsNavigation from '@Components/InformationTabsNavigation';
import ServicePageTitle from '@Components/ServicePageTitle';
import { NewsItemData, PublicationData } from '@Types/Press';
import { MetaData } from '@Types/Meta';
import NewsItem from './elements/NewsItem';
import Publication from './elements/Publication';
import FeedbackPanel from './elements/FeedbackPanel';
import styles from './PagePress.module.css';

export interface PagePressProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PagePress: FC<PagePressProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { pageMenu, news, publications } = page;
  const { isDesktopL, isDesktopM, isMobileM } = useMedias();
  const [showAll, setShowAll] = useState(false);

  const visibleArticles = useMemo(() => {
    if (showAll) return news;

    let articles = [];

    if (isDesktopL) {
      articles = news.slice(0, 12);
    }

    if (isDesktopM) {
      articles = news.slice(0, 9);
    }

    if (isMobileM) {
      articles = news.slice(0, 6);
    }

    return articles;
  }, [showAll, isDesktopL, isDesktopM, isMobileM, news]);

  const handleMore = useCallback(() => {
    setShowAll(true);
  }, []);

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.mainContainer}>
        <ServicePageTitle view='bordered' title='Мы в прессе' />
        <InformationTabsNavigation className={styles.menu} navigation={pageMenu} />
        <List
          {...restProps}
          className={styles.articlesList}
          items={visibleArticles}
          renderChild={(item: NewsItemData) => (
            <NewsItem article={item} className={styles.articlesItem} />
          )}
        />
        {!showAll && (
          <Button className={styles.moreButton} theme='dirty' onClick={handleMore}>
            Смотреть еще
          </Button>
        )}
      </div>
      <div className={styles.coloredRow}>
        <FeedbackPanel className={styles.mainContainer} />
      </div>
      <List
        {...restProps}
        className={styles.publicationsList}
        items={publications}
        renderChild={(item: PublicationData) => (
          <Publication publication={item} className={styles.publicationItem} />
        )}
      />
    </div>
  );
};

export default memo(PagePress);
