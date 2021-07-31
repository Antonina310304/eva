import React, { FC, HTMLAttributes, useCallback, memo, useMemo } from 'react';
import cn from 'classnames';
import { useLocation, useParams } from 'react-router-dom';

import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import ChooseMattressBanner from '@Mattresses/ChooseMattressBanner';
import MattressesLayers from '@Mattresses/MattressesLayers';
import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import NanoProductCard from '@Components/NanoProductCard';
import ProductModel from '@Components/ProductModel';
import InstagramSection from '@Components/InstagramSection';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import { ReviewData } from '@Types/Review';
import PhotoGallery from './elements/PhotoGallery';
import MainGrid from './elements/MainGrid';
import Sidebar from './elements/Sidebar';
import CrossSaleSection from './elements/CrossSaleSection';
import DeliverySection from './elements/DeliverySection';
import ComfortBuy from './elements/ComfortBuy';
import ReviewsSection from './elements/ReviewsSection';
import ListReviews from './elements/ListReviews';
import Characteristics from './elements/Characteristics';
import fakeData from './fakeData.json';
import styles from './PageProduct.module.css';

export interface RouteParams {
  region: string;
}

export interface PageProductProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageProduct: FC<PageProductProps> = (props) => {
  const { className, ...restProps } = props;
  const { pathname } = useLocation();
  const { region } = useParams<RouteParams>();
  const [, { openModal }] = useModals();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true, region });

  const siteReviews = useMemo(() => {
    if (!page.isSuccess) return [];

    return (page.data.reviewsSubgallery || []).filter((review: ReviewData) => {
      return review.source === 'site';
    });
  }, [page.data, page.isSuccess]);

  const handleCalcMatrasy = useCallback(() => {
    console.log('Event to analytic!');
  }, []);

  const handleAddReview = useCallback(() => {
    if (!page.isSuccess) return;

    openModal('SendReview', { product: page.data.product });
  }, [openModal, page.data, page.isSuccess]);

  if (!page.isSuccess || !meta.isSuccess) return null;

  const {
    product,
    ar,
    breadcrumbs,
    mediaGallery,
    cylindo,
    crossSalesProducts,
    sameProducts,
    historyProducts,
    parameters,
    importantInfo,
    documents,
    modules,
  } = page.data;

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <MainGrid
        className={cn(styles.mainContainer, styles.wrapperMain)}
        sidebar={<Sidebar page={page.data} meta={meta.data} />}
      >
        <PhotoGallery
          images={mediaGallery}
          tags={product.tags}
          ar={ar}
          category={breadcrumbs[1].text}
        />
      </MainGrid>

      <MainGrid className={cn(styles.mainContainer, styles.wrapperParams)}>
        {page.data.cylindo && <ProductModel className={styles.cylindo} medias={cylindo} />}

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

        <div className={styles.characteristics}>
          <Characteristics
            title='Характеристики'
            tabs={[
              { id: '0', label: 'Собранный' },
              { id: '1', label: 'Разобранный' },
            ]}
            schemes={[
              {
                id: '0',
                images: [
                  {
                    url: '/react/static/img/scheme1.jpg',
                    width: 511,
                    height: 236,
                  },
                  {
                    url: '/react/static/img/scheme2.jpg',
                    width: 269,
                    height: 235,
                  },
                ],
              },
              {
                id: '1',
                images: [
                  {
                    url: '/react/static/img/scheme3.jpg',
                    width: 232,
                    height: 389,
                  },
                  {
                    url: '/react/static/img/scheme4.jpg',
                    width: 81,
                    height: 388,
                  },
                ],
              },
            ]}
            parameters={parameters}
            importantInfo={importantInfo}
            documents={documents}
            modules={modules}
          />
        </div>
      </MainGrid>

      {['matrasy', 'krovati'].includes(page.data.categoryTranslite) &&
      meta.data.country === 'RUS' ? (
        <ChooseMattressBanner
          className={styles.mattressesBanner}
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
      ) : (
        <div className={styles.separator} />
      )}

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

        <div className={cn(styles.littleContainer, styles.sectionReviews)}>
          <ReviewsSection reviews={page.data.reviewsSubgallery} onAddReview={handleAddReview} />
          <div className={styles.wrapperListReviews}>
            <ListReviews className={styles.listReviews} reviews={siteReviews} />
          </div>
        </div>

        {page.data.instagram?.length > 0 && (
          <InstagramSection
            className={styles.sectionInstagram}
            hasPromoPlaceholder
            title='Обустраиваете дом? Мы хотим посмотреть!'
            description={
              <div className={styles.instagramDescription}>
                {`Cтилизуете интерьер вместе с Divan.ru – отмечайте `}
                <Link view='native' to='/'>
                  @official_divan.ru
                </Link>
                {` на фото в своем аккаунте Instagram, добавляйте хештег #купилвдиванру. Мы публикуем
                лучшие кадры.`}
              </div>
            }
            posts={page.data.instagram}
          />
        )}

        <div className={cn(styles.littleContainer, styles.sectionDelivery)}>
          <DeliverySection title='Стоимость доставки' />
        </div>

        {fakeData.heading && fakeData.advantages?.length > 0 && (
          <ComfortBuy
            className={styles.comfortBuy}
            heading={fakeData.heading}
            items={fakeData.advantages}
          />
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
