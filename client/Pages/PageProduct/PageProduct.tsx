import React, { FC, HTMLAttributes, useCallback, memo } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import ChooseMattressBanner from '@Mattresses/ChooseMattressBanner';
import MattressesLayers from '@Mattresses/MattressesLayers';
import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import NanoProductCard from '@Components/NanoProductCard';
import PhotoGallery from './elements/PhotoGallery';
import MainGrid from './elements/MainGrid';
import Sidebar from './elements/Sidebar';
import CrossSaleSection from './elements/CrossSaleSection';
import ComfortBuy from './elements/ComfortBuy';
import styles from './PageProduct.module.css';

import fakeData from './fakeData.json';

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
  const meta = useMeta();

  const handleCalcMatrasy = useCallback(() => {
    console.log('Event to analytic!');
  }, []);

  if (!page.isSuccess || !meta.isSuccess) return null;

  const { product, mediaGallery, crossSalesProducts, sameProducts, historyProducts } = page.data;

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

        {page.data.layers?.length > 0 && (
          <div className={styles.layers}>
            <MattressesLayers
              layers={page.data.layers}
              priorityParameter={page.data.priorityParameter}
            />
          </div>
        )}
      </MainGrid>

      {['matrasy', 'krovati'].includes(page.data.categoryTranslite) && meta.data.country === 'RUS' && (
        <ChooseMattressBanner
          categoryColor={product.categoryColor}
          title='Подбери лучший!'
          action={{
            title: 'Подобрать матрас',
            link: '/promo/mattrasses',
          }}
          onLink={handleCalcMatrasy}
        >
          Пройди простой Quiz и узнай,
          <br />
          {` какие матрасы подойдут именно для тебя.`}
        </ChooseMattressBanner>
      )}
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
            renderItem={(productCardProps) => (
              <div className={styles.productItem}>
                <CrossSaleProductCard {...productCardProps} />
              </div>
            )}
          />
        )}
        {fakeData.heading.length > 0 && fakeData.advantages.length > 0 && (
          <ComfortBuy heading={fakeData.heading} items={fakeData.advantages} />
        )}
        {sameProducts.products?.length > 0 && (
          <CrossSaleSection
            className={styles.sectionSimilar}
            title='Похожие модели'
            products={sameProducts.products}
            key={`similar-${product.id}`}
            renderItem={(productCardProps) => (
              <div className={styles.productItem}>
                <CrossSaleProductCard {...productCardProps} />
              </div>
            )}
          />
        )}

        {historyProducts.products?.length > 0 && (
          <CrossSaleSection
            className={styles.sectionHistory}
            title='Вы недавно смотрели'
            products={historyProducts.products}
            key={`history-${product.id}`}
            renderItem={(productCardProps) => (
              <div className={styles.nanoProductItem}>
                <NanoProductCard {...productCardProps} />
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default memo(PageProduct);
