import React, { FC, HTMLAttributes, memo } from 'react';
import { OfferSearchData, SearchResultData } from '@Types/SearchResultData';
import { ProductSearchData } from '@Types/Product';
import Flex from '@Components/Flex/Flex';

import List from '@Components/Header/elems/Search/elems/List';
import ProductList from '@Components/Header/elems/Search/elems/ProductList';
import SearchResult from '@Components/Header/elems/Search/elems/SearchResult/SearchResult';
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
          <Flex fw='wrap' jc='flex-start' className={styles.flexWrapper}>
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
          </Flex>

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
