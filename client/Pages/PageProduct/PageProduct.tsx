import React, { FC, HTMLAttributes, useCallback, memo, useMemo, useState } from 'react';
import cn from 'classnames';

import ChooseMattressBanner from '@Mattresses/ChooseMattressBanner';
import MattressesLayers from '@Mattresses/MattressesLayers';
import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import NanoProductCard from '@Components/NanoProductCard';
import ProductModel from '@Components/ProductModel';
import InstagramSection from '@Components/InstagramSection';
import Link from '@UI/Link';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import useModals from '@Hooks/useModals';
import { useRelatedProducts } from '@Stores/relatedProducts';
import { ReviewData } from '@Types/Review';
import { ProductData } from '@Types/Product';
import { MetaData } from '@Types/Meta';
import PhotoGallery from './elements/PhotoGallery';
import MainGrid from './elements/MainGrid';
import Sidebar from './elements/Sidebar';
import CrossSaleSection from './elements/CrossSaleSection';
import DeliverySection from './elements/DeliverySection';
import ComfortBuy from './elements/ComfortBuy';
import ReviewsSection from './elements/ReviewsSection';
import ListReviews from './elements/ListReviews';
import Characteristics from './elements/Characteristics';
import ProductFeatures from './elements/ProductFeatures';
import fakeData from './fakeData.json';
import styles from './PageProduct.module.css';

export interface PageProductProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PageProduct: FC<PageProductProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
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
    features,
  } = page;
  const [, { openModal }] = useModals();
  const [selectedCrossSaleTab, setSelectedCrossSaleTab] = useState('all');

  const siteReviews = useMemo(() => {
    return (page.reviewsSubgallery || []).filter((review: ReviewData) => {
      return review.source === 'site';
    });
  }, [page]);

  const crossSalesTabs = useMemo(() => {
    if (!page?.crossSalesProducts) return [];

    const tabs = [{ id: 'all', label: 'Все категории' }];

    page.crossSalesProducts.products.forEach((p: ProductData) => {
      const tab = tabs.find((t) => t.id === p.type);

      if (tab) return;

      tabs.push({ id: p.type, label: p.type });
    });

    return tabs;
  }, [page]);

  const filteredCrossSalesProducts = useMemo(() => {
    const cross = page?.crossSalesProducts;

    if (!cross) return [];
    if (selectedCrossSaleTab === 'all') return cross.products;

    return cross.products.filter((p: ProductData) => {
      return p.type === selectedCrossSaleTab;
    });
  }, [page, selectedCrossSaleTab]);

  const handleCalcMatrasy = useCallback(() => {
    console.log('Event to analytic!');
  }, []);

  const handleAddReview = useCallback(() => {
    openModal('SendReview', { product: page.product });
  }, [openModal, page]);

  const handleChangeCrossSaleTab = useCallback((_e, tab: Tab) => {
    setSelectedCrossSaleTab(tab.id);
  }, []);

  useRelatedProducts({ productId: page.product.id, lists: page.relatedProducts });

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <MainGrid
        className={cn(styles.mainContainer, styles.wrapperMain)}
        sidebar={<Sidebar page={page} meta={meta} />}
      >
        <PhotoGallery
          images={mediaGallery}
          tags={product.tags}
          ar={ar}
          category={breadcrumbs[1].text}
        />
      </MainGrid>

      <MainGrid className={cn(styles.mainContainer, styles.wrapperParams)}>
        {page.cylindo && <ProductModel className={styles.cylindo} medias={cylindo} />}

        {page.description && (
          <div
            className={styles.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: page.description }}
          />
        )}

        {page.layers?.length > 0 && (
          <div className={styles.layers}>
            <MattressesLayers layers={page.layers} priorityParameter={page.priorityParameter} />
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

        {features?.length > 0 && (
          <ProductFeatures className={styles.wrapperFeatures} features={features} />
        )}
      </MainGrid>

      {['matrasy', 'krovati'].includes(page.categoryTranslite) && meta.country === 'RUS' ? (
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
            products={filteredCrossSalesProducts}
            tabs={
              crossSalesTabs.length > 1 && (
                <ButtonTabs
                  scrollable
                  defaultValue={selectedCrossSaleTab}
                  tabs={crossSalesTabs}
                  onChangeTab={handleChangeCrossSaleTab}
                />
              )
            }
            renderItem={(productCardProps) => (
              <div className={styles.productItem}>
                <CrossSaleProductCard {...productCardProps} />
              </div>
            )}
          />
        )}

        <div className={cn(styles.littleContainer, styles.sectionReviews)}>
          <ReviewsSection reviews={page.reviewsSubgallery} onAddReview={handleAddReview} />
          <div className={styles.wrapperListReviews}>
            <ListReviews className={styles.listReviews} reviews={siteReviews} />
          </div>
        </div>

        {page.instagram?.length > 0 && (
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
            posts={page.instagram}
          />
        )}

        <div className={cn(styles.littleContainer, styles.sectionDelivery)}>
          <DeliverySection title='Стоимость доставки' delivery={page.deliveryPage} />
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
