import { FC, HTMLAttributes, memo } from 'react';

import Link from '@UI/Link';
import { SearchResultData } from '@Types/SearchResultData';
import ProductList from '../ProductList';
import List from '../List';
import styles from './SearchResult.module.css';

export interface SearchResultProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  result: SearchResultData;
}

const SearchResult: FC<SearchResultProps> = ({ result }) => {
  return (
    <div>
      {result?.products.length ? (
        <div className={styles.wrapper}>
          <div className={styles.matches}>
            <List classNameTitle={styles.title} title='Совпадения' list={result.matches} />
          </div>
          <div className={styles.productList}>
            <div className={styles.header}>
              <p className={styles.title}>Товары</p>
              <p className={styles.count}>{`Найдено ${result.products.length}`}</p>
              <Link className={styles.link} to='#'>
                Все результаты поиска
              </Link>
            </div>
            <ProductList products={result.products} />
          </div>
        </div>
      ) : (
        <p className={styles.emptyTitle}>{`По запросу «${result.request}» ничего не найдено`}</p>
      )}
    </div>
  );
};

export default memo(SearchResult);
