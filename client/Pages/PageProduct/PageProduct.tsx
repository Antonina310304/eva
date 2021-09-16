import React, {
  FC,
  HTMLAttributes,
  useCallback,
  memo,
  useMemo,
  useState,
  useRef,
  useEffect,
  MutableRefObject,
} from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import NanoProductCard from '@Components/NanoProductCard';
import InstagramSection from '@Components/InstagramSection';
import { LazyProductModel } from '@Components/ProductModel';
import Link from '@UI/Link';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import { useRelatedProducts } from '@Stores/RelatedProducts';
import { ReviewData } from '@Types/Review';
import { ProductData } from '@Types/Product';
import { MetaData } from '@Types/Meta';
import PhotoGallery from './elements/PhotoGallery';
import Sidebar from './elements/Sidebar';
import DeliverySection from './elements/DeliverySection';
import ComfortBuy from './elements/ComfortBuy';
import ReviewsSection from './elements/ReviewsSection';
import ListReviews from './elements/ListReviews';
import Characteristics from './elements/Characteristics';
import styles from './PageProduct.module.css';

export interface PageProductProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const CrossSaleSection = loadable(() => import('@Components/CrossSaleSection'));
const MattressesLayers = loadable(() => import('@Mattresses/MattressesLayers'));
const ChooseMattressBanner = loadable(() => import('@Mattresses/ChooseMattressBanner'));
const ModulesList = loadable(() => import('./elements/ModulesList'));
const ProductFeatures = loadable(() => import('./elements/ProductFeatures'));

const PageProduct: FC<PageProductProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const [, { openModal }] = useModals();
  const { isDesktop, isMobileM } = useMedias();
  const [selectedCrossSaleTab, setSelectedCrossSaleTab] = useState('all');
  const [positionSidebar, setPositionSidebar] = useState(null);
  const refCharacteristics = useRef<HTMLDivElement>();
  const refReviews = useRef<HTMLDivElement>();
  const refWrapperSidebar = useRef<HTMLDivElement>();
  const refSidebar = useRef<HTMLDivElement>();
  const refMainContent = useRef<HTMLDivElement>();
  const refLastScroll = useRef(0);
  const howManyCanScroll = useRef(null);
  const howRestScroll = useRef(null);
  const headerHeight = isDesktop ? 0 : 90;

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

  const scrollToRef = useCallback(
    (ref: MutableRefObject<HTMLDivElement>) => {
      if (!ref?.current) return;

      const rect = ref.current.getBoundingClientRect();
      const top = window.scrollY + rect.top - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    },
    [headerHeight],
  );

  const handleCalc = useCallback(() => {
    const rectSidebar = refSidebar.current.getBoundingClientRect();

    howManyCanScroll.current = rectSidebar.height - window.innerHeight + 30 + headerHeight;
  }, [headerHeight]);

  const handleCalcMatrasy = useCallback(() => {
    console.log('Event to analytic!');
  }, []);

  const handleAddReview = useCallback(() => {
    openModal('SendReview', { product: page.product });
  }, [openModal, page]);

  const handleChangeCrossSaleTab = useCallback((_e, tab: Tab) => {
    setSelectedCrossSaleTab(tab.id);
  }, []);

  const handleClickCharacteristics = useCallback(() => {
    scrollToRef(refCharacteristics);
  }, [scrollToRef]);

  const handleClickReviews = useCallback(() => {
    scrollToRef(refReviews);
  }, [scrollToRef]);

  const handleChangePositionSidebar = useCallback(() => {
    // Для расчета позиции скрола используем Math.abs(rectDocument.top) вместо window.pageYOffset
    // Потому что window.pageYOffset обнуляется во время блокировки скрола (например, во время открытия модальных окон)

    if (!refMainContent.current) return;
    if (!refSidebar.current) return;

    const rectDocument = document.documentElement.getBoundingClientRect();
    const rectContent = refMainContent.current.getBoundingClientRect();
    const rectWrapperSidebar = refWrapperSidebar.current.getBoundingClientRect();
    const rectSidebar = refSidebar.current.getBoundingClientRect();
    const diffScroll = refLastScroll.current - Math.abs(rectDocument.top);
    const right = `${document.documentElement.offsetWidth - rectWrapperSidebar.right}px`;
    const left = `${rectWrapperSidebar.left}px`;

    refLastScroll.current = Math.abs(rectDocument.top);

    if (typeof howRestScroll.current !== 'number') {
      howRestScroll.current = howManyCanScroll.current;
    }

    if (rectSidebar.top <= headerHeight) {
      howRestScroll.current += diffScroll;
    }

    // Количество оставшего скрола не должно превышать кол-во доступного скрола
    if (howRestScroll.current < 0) {
      howRestScroll.current = 0;
    }
    if (howRestScroll.current > howManyCanScroll.current) {
      howRestScroll.current = howManyCanScroll.current;
    }

    // Отслеживаем момент, когда контент страницы должен вытеснять сайдбар наверх
    // И прерываем последующие расчеты позиции
    if (
      Math.round(rectContent.bottom) <= Math.round(rectSidebar.bottom) &&
      Math.round(rectSidebar.top) <= headerHeight
    ) {
      setPositionSidebar({
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      });
      return;
    }

    // Фиксируем нижнюю границу сайдбара и искусственно смещаем по оси Y на кол-во оставшегося скрола
    if (Math.round(rectContent.top) <= headerHeight) {
      setPositionSidebar({
        position: 'fixed',
        bottom: 30,
        right,
        left,
        transform: `translateY(${howRestScroll.current}px)`,
      });
    } else {
      setPositionSidebar(null);
    }
  }, [headerHeight]);

  useRelatedProducts({ productId: page.product.id, lists: page.relatedProducts });

  useEffect(() => {
    setTimeout(handleChangePositionSidebar, 200);
    window.addEventListener('scroll', handleChangePositionSidebar, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleChangePositionSidebar);
    };
  }, [handleChangePositionSidebar]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout = null;
    const cleanup = () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleCalc);
      window.removeEventListener('resize', handleChangePositionSidebar);
    };

    if (isMobileM) return cleanup;

    handleCalc();
    intervalId = setInterval(handleCalc, 100);
    window.addEventListener('resize', handleCalc);
    window.addEventListener('resize', handleChangePositionSidebar);

    return cleanup;
  }, [handleCalc, handleChangePositionSidebar, isMobileM]);

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.head} />
      <div className={cn(styles.mainContainer, styles.wrapperMain)}>
        <div className={styles.grid}>
          <div ref={refMainContent}>
            <PhotoGallery
              images={page.mediaGallery}
              tags={page.product.tags}
              ar={page.ar}
              category={page.breadcrumbs[1].text}
            />

            {isMobileM && (
              <div className={styles.wrapperSidebar}>
                <Sidebar
                  page={page}
                  meta={meta}
                  onClickCharacteristics={handleClickCharacteristics}
                  onClickReviews={handleClickReviews}
                />
              </div>
            )}

            {page.cylindo && <LazyProductModel className={styles.cylindo} medias={page.cylindo} />}

            {page.description && (
              <div
                className={styles.description}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: page.description }}
              />
            )}

            {page.modules.length > 0 && (
              <div className={styles.modules}>
                <ModulesList modules={page.modules} />
              </div>
            )}

            {page.layers?.length > 0 && (
              <div className={styles.layers}>
                <MattressesLayers layers={page.layers} priorityParameter={page.priorityParameter} />
              </div>
            )}

            <div className={styles.characteristics} ref={refCharacteristics}>
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
                        url: '/react/static/img/scheme1_1.png',
                        width: 511,
                        height: 236,
                      },
                      {
                        url: '/react/static/img/scheme2_1.png',
                        width: 269,
                        height: 235,
                      },
                    ],
                  },
                  {
                    id: '1',
                    images: [
                      {
                        url: '/react/static/img/scheme3_1.png',
                        width: 232,
                        height: 389,
                      },
                      {
                        url: '/react/static/img/scheme4_1.png',
                        width: 81,
                        height: 388,
                      },
                    ],
                  },
                ]}
                parameters={page.parameters}
                importantInfo={page.importantInfo}
                importantParameters={page.importantParameters}
                documents={page.documents}
                modules={page.modules}
              />
            </div>

            {page.features?.length > 0 && (
              <ProductFeatures className={styles.wrapperFeatures} features={page.features} />
            )}
          </div>

          {!isMobileM && (
            <div className={styles.wrapperSidebar} ref={refWrapperSidebar}>
              <div style={positionSidebar} ref={refSidebar}>
                <Sidebar
                  page={page}
                  meta={meta}
                  onClickCharacteristics={handleClickCharacteristics}
                  onClickReviews={handleClickReviews}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {['matrasy', 'krovati'].includes(page.categoryTranslite) && meta.country === 'RUS' ? (
        <ChooseMattressBanner
          className={styles.mattressesBanner}
          categoryColor={page.product.categoryColor}
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
        {page.crossSalesProducts.products?.length > 0 && (
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

        <div className={cn(styles.littleContainer, styles.sectionReviews)} ref={refReviews}>
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

        <ComfortBuy className={styles.comfortBuy} />

        {page.sameProducts.products?.length > 0 && (
          <CrossSaleSection
            className={styles.sectionSimilar}
            title='Похожие модели'
            products={page.sameProducts.products}
            renderItem={(productCardProps) => (
              <div className={styles.productItem}>
                <CrossSaleProductCard {...productCardProps} />
              </div>
            )}
          />
        )}

        {page.historyProducts.products?.length > 0 && (
          <CrossSaleSection
            className={styles.sectionHistory}
            title='Вы недавно смотрели'
            products={page.historyProducts.products}
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
