import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import Section from '@Components/Section';
import ButtonTabs from '@UI/ButtonTabs';
import PhotoGallery from './elements/PhotoGallery';
import MainGrid from './elements/MainGrid';
import Sidebar from './elements/Sidebar';
import CrossSaleSection from './elements/CrossSaleSection';
import styles from './PageProduct.module.css';

export interface RouteParams {
  slug: string;
}

export interface PageProductProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageProduct: FC<PageProductProps> = (props) => {
  const { className, ...restProps } = props;
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });

  if (!page.isSuccess) return null;

  const { product, mediaGallery, crossSalesProducts, sameProducts } = page.data;

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <MainGrid
        className={cn(styles.mainContainer, styles.wrapperMain)}
        sidebar={<Sidebar page={page.data} />}
      >
        <PhotoGallery images={mediaGallery} tags={product.tags} />
      </MainGrid>

      <MainGrid className={cn(styles.mainContainer, styles.wrapperParams)}>
        {page.data.description && (
          <div
            className={styles.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: page.data.description }}
          />
        )}
      </MainGrid>

      <div className={styles.separator} />

      <div className={styles.wrapperAdditional}>
        {crossSalesProducts.products?.length > 0 && (
          <CrossSaleSection
            className={styles.sectionCrossSale}
            title='С этим обычно покупают'
            products={crossSalesProducts.products}
            tabs={[
              { id: '0', label: 'Все категории' },
              { id: '1', label: 'Диваны' },
              { id: '2', label: 'Кресла' },
              { id: '3', label: 'Пуфы' },
            ]}
            key={`cross-sale-${product.id}`}
          />
        )}

        {sameProducts.products?.length > 0 && (
          <CrossSaleSection
            className={styles.sectionSimilar}
            title='Похожие модели'
            products={sameProducts.products}
            key={`similar-${product.id}`}
          />
        )}
      </div>
    </div>
  );
};

export default memo(PageProduct);
