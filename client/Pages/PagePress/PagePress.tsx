import { FC, HTMLAttributes, memo, useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import List from '@UI/List';
import Button from '@UI/Button';
import InformationTabsNavigation from '@Components/InformationTabsNavigation';
import ServicePageTitle from '@Components/ServicePageTitle';
import { ArticleData, PublicationData } from '@Types/Press';
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
  const { pageMenu, news, publications, mail } = page;
  const { isDesktopL, isDesktopM, isMobileM } = useMedias();
  const [showAll, setShowAll] = useState(false);
  const [, { openModal }] = useModals();

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

  const handleClickArticle = useCallback(
    (_e, index) => {
      openModal('Article', { articles: news, index });
    },
    [news, openModal],
  );

  const handleClickPublication = useCallback(
    (_e, index) => {
      openModal('Publication', { publications, index });
    },
    [publications, openModal],
  );

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.mainContainer}>
        <ServicePageTitle view='bordered' title='Мы в прессе' />
        <InformationTabsNavigation className={styles.menu} navigation={pageMenu} />
        <List
          className={styles.articlesList}
          items={visibleArticles}
          renderChild={(item: ArticleData, index: number) => (
            <NewsItem
              article={item}
              className={styles.articlesItem}
              onClick={(e) => handleClickArticle(e, index)}
            />
          )}
        />
        {!showAll && (
          <Button className={styles.moreButton} theme='dirty' onClick={handleMore}>
            Смотреть еще
          </Button>
        )}
      </div>
      <div className={styles.coloredRow}>
        <FeedbackPanel className={styles.mainContainer} page='press' mailTo={mail} />
      </div>
      <List
        {...restProps}
        className={styles.publicationsList}
        items={publications}
        renderChild={(item: PublicationData, index: number) => (
          <Publication
            publication={item}
            className={styles.publicationItem}
            onClick={(e) => handleClickPublication(e, index)}
          />
        )}
      />
    </div>
  );
};

export default memo(PagePress);
