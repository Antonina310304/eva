import React, { FC, HTMLAttributes, memo, useCallback, MouseEvent } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';

import declOfNum from '@Utils/declOfNum';
import Like from '@Components/Like';
import Fabrics from '@Components/Fabrics';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Button from '@UI/Button';
import Rating from '@UI/Rating';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import PageProductStore from '@Stores/PageProduct';
import { useRelatedProducts } from '@Stores/RelatedProducts';
import { MetaData } from '@Types/Meta';
import fabricImages from '../../fabrics';
import LinksList from '../LinksList';
import styles from './Sidebar.module.css';

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
  onClickCharacteristics?: (e: MouseEvent) => void;
  onClickReviews?: (e: MouseEvent) => void;
}

const fabrics = [
  {
    image: fabricImages[0],
  },
  {
    image: fabricImages[1],
  },
  {
    image: fabricImages[2],
  },
];

const OrderBonuses = loadable(() => import('@Components/OrderBonuses'));
const RelatedProducts = loadable(() => import('../RelatedProducts'));
const OutOfStock = loadable(() => import('../OutOfStock'));

const Sidebar: FC<SidebarProps> = (props) => {
  const { className, page, meta, onClickCharacteristics, onClickReviews, ...restProps } = props;
  const shortName = page.product.name.split(' ')[0];
  const hasExpired = page.product.price.expired > 0;
  const hasDiscount = page.product.price.discount > 0;
  const labels = ['отзыв', 'отзыва', 'отзывов'];
  const label = declOfNum(page.reviewsPhotoCount, labels);
  const countReviewsText = `${page.reviewsPhotoCount} ${label}`;
  const [, { openModal }] = useModals();
  const relatedProducts = useRelatedProducts();

  const handleClickCredit = useCallback(() => {
    openModal('BuyInCredit', { productId: page.product.id });
  }, [openModal, page]);

  const handleClickShowroom = useCallback(() => {
    openModal('Showrooms', { showrooms: page.sellPoints });
  }, [openModal, page.sellPoints]);

  const handleClickQualityGuarantee = useCallback(() => {
    openModal('QualityGuarantee');
  }, [openModal]);

  const handleClickFinalPrice = useCallback(() => {
    openModal('FinalPrice');
  }, [openModal]);

  const handleClickDeliveryInformation = useCallback(() => {
    openModal('DeliveryInformation');
  }, [openModal]);

  const handleClickPriceDrop = useCallback(
    (e) => {
      e.preventDefault();
      openModal('PriceDrop', { product: page.product });
    },
    [openModal, page.product],
  );

  const handleClickConstructor = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  const handleAddToCart = useCallback(() => {
    openModal('Cart', {
      products: [
        {
          isModular: page.product.modules?.length > 0,
          shopProductId: page.product.id,
          parameterValues: PageProductStore.getParameterValues(),
        },
      ],
    });
  }, [openModal, page.product]);

  const handleClickNotifyAboutReceipt = useCallback(() => {
    openModal('NotifyAboutReceipt', { product: page.product });
  }, [openModal, page.product]);

  const handleClickReviews = useCallback(
    (e) => {
      e.preventDefault();

      if (onClickReviews) onClickReviews(e);
    },
    [onClickReviews],
  );

  const handleClickOrderSamples = useCallback(
    (e) => {
      e.preventDefault();
      openModal('Info', {
        title: 'Упс!',
        text: 'Ещё не готово, заходите позже…',
      });
    },
    [openModal],
  );

  return (
    <div {...restProps} className={cn(styles.sidebar, className)}>
      <div className={styles.shortName}>
        {shortName}
        <Like className={styles.like} />
      </div>
      <div className={styles.fullName}>{page.product.name}</div>

      {page.reviewsPhotoCount > 0 && (
        <div className={styles.wrapperRating}>
          <Rating className={styles.rating} defaultValue={page.product.rating} />
          <Link className={styles.countReviews} to='#' view='primary' onClick={handleClickReviews}>
            {countReviewsText}
          </Link>
        </div>
      )}

      {page.isAvailable ? (
        <>
          <div className={styles.wrapperPrice}>
            <div className={styles.containerPrices}>
              <Price className={styles.actualPrice} price={page.product.price.actual} />
              {hasExpired && (
                <Price expired className={styles.expiredPrice} price={page.product.price.expired} />
              )}
              {hasDiscount && (
                <Discount className={styles.discount}>{page.product.price.discount}</Discount>
              )}
            </div>
          </div>

          {meta.country === 'RUS' && (
            <>
              <OrderBonuses className={styles.bonuses} productIds={[page.product.id]} />

              <Link
                className={styles.priceReduction}
                view='primary'
                to='#'
                onClick={handleClickPriceDrop}
              >
                Подписаться на изменение цены
              </Link>
            </>
          )}
        </>
      ) : (
        <div className={styles.wrapperOutOfStock}>
          <OutOfStock />
        </div>
      )}

      <div className={styles.wrapperFabrics}>
        <Fabrics fabrics={fabrics} defaultSelectedFabric={fabrics[0]} size='m' />
        <Link
          className={styles.orderFabrics}
          to='#'
          view='primary'
          onClick={handleClickOrderSamples}
        >
          Заказать образцы тканей
        </Link>
      </div>

      {relatedProducts.selectedLists.length > 0 && (
        <RelatedProducts
          className={styles.relatedProducts}
          label='Добавьте сопутствующие товары:'
          lists={relatedProducts.selectedLists}
        />
      )}

      <div className={styles.actions}>
        {page.isAvailable ? (
          <>
            {page.isConfigurator && (
              <Button
                className={styles.action}
                wide
                theme='secondary'
                onClick={handleClickConstructor}
              >
                Изменить конфигурацию
              </Button>
            )}
            <Button className={cn(styles.action, styles.btnBuy)} wide onClick={handleAddToCart}>
              В корзину
            </Button>
          </>
        ) : (
          <Button
            className={styles.action}
            wide
            theme='secondary'
            onClick={handleClickNotifyAboutReceipt}
          >
            Уведомить о поступлении
          </Button>
        )}
      </div>

      <div className={styles.linksList}>
        <LinksList
          items={[
            {
              icon: <div className={cn(styles.icon, styles.delivery)} />,
              hasArrow: true,
              label: 'Информация о доставке',
              onClick: handleClickDeliveryInformation,
            },
            page.credit?.creditAvailable && {
              icon: <div className={cn(styles.icon, styles.perzent)} />,
              hasArrow: true,
              label: 'Купить в кредит без переплаты',
              onClick: handleClickCredit,
            },
            !page.credit?.creditAvailable && {
              icon: <div className={cn(styles.icon, styles.attention)} />,
              hasArrow: true,
              label: 'Финальная цена',
              onClick: handleClickFinalPrice,
            },
            page.sellPoints?.length > 0 && {
              label: 'Эта модель в шоурумах',
              hasArrow: true,
              onClick: handleClickShowroom,
            },
            {
              hasArrow: true,
              label: 'Гарантируем качество',
              onClick: handleClickQualityGuarantee,
            },
            {
              label: 'Характеристики',
              onClick: onClickCharacteristics,
            },
            {
              label: 'Фото и отзывы',
              onClick: onClickReviews,
            },
          ].filter(Boolean)}
        />
      </div>
    </div>
  );
};

export default memo(Sidebar);
