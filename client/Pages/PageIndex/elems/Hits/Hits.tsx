import React, { cloneElement, FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import CrossSaleProductCard from '@Components/CrossSaleProductCard/CrossSaleProductCard';
import loadable from '@loadable/component';
import Gallery from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar/ProgressBar';
import { products } from '@Pages/PageIndex/data';
import CrossSaleSection from '@Components/CrossSaleSection';
import ButtonTabs from '@UI/ButtonTabs/ButtonTabs';
import Container from '@Components/Container';
import styles from './Hits.module.css';

export interface HitsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  description?: string;
}

const Hits: FC<HitsProps> = ({ description, title, className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <Container>
        <div className={styles.header}>
          <p className={styles.title}>{title || 'Мебель начинается с дивана'}</p>
          <p className={styles.description}>
            {description ||
              'В нашем интернет-магазине представлены только тщательно отобранные модели, исключительные\n' +
                ' диваны – хиты продаж в Москве и по России. Каждая модель дивана из нашего интернет каталога\n' +
                ' – это воплощение отличного дизайна, легенда мебельной отрасли.'}
          </p>
        </div>
      </Container>
      <div>
        <div className={styles.wrapperGallery} />
        <CrossSaleSection
          className={styles.sectionCrossSale}
          title=''
          products={products}
          renderItem={(productCardProps) => (
            <div className={styles.productItem}>
              <CrossSaleProductCard {...productCardProps} />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default memo(Hits);
