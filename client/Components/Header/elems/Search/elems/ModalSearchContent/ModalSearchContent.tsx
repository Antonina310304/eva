import React, { FC, HTMLAttributes, memo } from 'react';

import { OfferSearchData, SearchResultData } from '@Types/SearchResultData';
import { ProductSearchData } from '@Types/Product';
import List from '../List';
import ProductList from '../ProductList';
import SearchResult from '../SearchResult/SearchResult';
import styles from './ModalSearchContent.module.css';

export interface ModalSearchContentProps extends HTMLAttributes<HTMLDivElement> {
  hits: ProductSearchData[];
  viewed: OfferSearchData[];
  offers: OfferSearchData[];
  request: SearchResultData;
}

const ModalSearchContent: FC<ModalSearchContentProps> = ({ hits, viewed, offers, request }) => {
  return (
    <div>
      {request.request !== '' && (
        <div className={styles.wrapper}>
          <SearchResult result={request} />
        </div>
      )}
      {request.products.length < 1 && (
        <div className={styles.innerWrap}>
          <div className={styles.flexWrapper}>
            {offers && (
              <div className={styles.wrapper}>
                <List classNameTitle={styles.title} title='Предложения' list={offers} />
              </div>
            )}

            {viewed && (
              <div className={styles.wrapper}>
                <List classNameTitle={styles.title} title='Вы недавно смотрели' list={viewed} />
              </div>
            )}
          </div>

          {hits && (
            <div className={styles.wrapper}>
              <p className={styles.title}>Хиты интернет продаж</p>
              <ProductList products={hits} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(ModalSearchContent);
