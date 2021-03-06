import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import cn from 'classnames';

import Like from '@Components/Like';
import Fabrics from '@Components/Fabrics';
import ProductTags from '@Components/ProductTags';
import GalleryProductPreviews from '@Components/GalleryProductPreviews';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import List from '@UI/List';
import Button from '@UI/Button';
import Link from '@UI/Link';
import useMedias from '@Hooks/useMedias';
import useModals from '@Hooks/useModals';
import { ProductData, ProductParameterGroupData } from '@Types/Product';
import Parameter from './elements/Parameter';
import Sizes, { SizeData } from './elements/Sizes';
import FastView from './elements/FastView';
import fabricImages from './fabrics';
import styles from './ProductCard.module.css';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
  view?: 'mini';
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

const ProductCard: FC<ProductCardProps> = (props) => {
  const { className, product, view, ...restProps } = props;
  const [firstImage] = product.images || [];
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;
  const { isOnlyDesktop } = useMedias();
  const [, { openModal }] = useModals();
  const [ref, inView] = useInView({
    rootMargin: '200px 0px',
    triggerOnce: false,
  });

  const handleBuy = useCallback(() => {
    openModal('Cart', {
      products: [
        {
          isModular: false,
          shopProductId: product.id,
        },
      ],
    });
  }, [openModal, product.id]);

  return (
    <div
      {...restProps}
      className={cn(
        styles.productCard,
        { [styles.hasExpired]: hasExpired, [styles.viewMini]: view === 'mini' },
        className,
      )}
      ref={ref}
    >
      <div className={styles.box} />

      <div className={styles.container}>
        <div className={styles.containerImage}>
          {inView ? (
            <>
              <GalleryProductPreviews
                className={styles.preview}
                images={product.images}
                link={product.link}
              />

              <div className={styles.actions}>
                <FastView className={cn(styles.action, styles.fastView)} />
                <Like className={cn(styles.action, styles.like)} />
              </div>

              {product.tags?.length > 0 && (
                <ProductTags className={styles.tags} tags={product.tags} />
              )}
            </>
          ) : (
            <div
              className={cn(styles.placeholderPreview, {
                [styles.landscape]: firstImage.orientation === 'landscape',
                [styles.portrait]: firstImage.orientation === 'portrait',
              })}
            />
          )}
        </div>

        <div className={styles.info}>
          <Link className={styles.name} to={product.link}>
            {product.name}
          </Link>
          <div className={styles.price}>
            <Price className={styles.actualPrice} price={product.price.actual} />
            {hasExpired && (
              <Price expired className={styles.expiredPrice} price={product.price.expired} />
            )}
            {hasDiscount && (
              <Discount className={styles.discount}>{product.price.discount}</Discount>
            )}
          </div>

          <div className={styles.fabricsWrapper}>
            <Fabrics
              className={styles.fabrics}
              fabrics={fabrics}
              defaultSelectedFabric={fabrics[0]}
            />
            <div className={styles.fabricsMore}>
              {`+150 `}
              <div className={styles.openConstructor}>
                <Link view='secondary' to='#'>
                  ?? ????????????????????????
                </Link>
              </div>
            </div>
          </div>
        </div>

        {inView && isOnlyDesktop && (
          <div className={styles.additionalInfo}>
            {product.parameterGroups?.length > 0 && (
              <List
                className={styles.parameterGroups}
                items={product.parameterGroups}
                renderChild={(parameterGroup: ProductParameterGroupData) => {
                  const parameters = product.parameters.filter((targetParameter) => {
                    return targetParameter.groupId === parameterGroup.id;
                  });

                  if (parameterGroup.theme === 'sizes') {
                    const sizes: SizeData[] = [];

                    parameters.forEach((parameter) => {
                      const parameterValue = product.parameterValues.find((pv) => {
                        return pv.parameterId === parameter.id;
                      });
                      const unit = product.units.find((u) => u.id === parameterValue.unitId);

                      sizes.push({
                        title: parameter.title,
                        value: `${parameterValue.value} ${unit.title}`,
                      });
                    });

                    return (
                      <Parameter className={styles.parameterGroup} title={parameterGroup.title}>
                        <Sizes sizes={sizes} />
                      </Parameter>
                    );
                  }

                  return null;
                }}
              />
            )}

            <Button className={styles.buy} wide onClick={handleBuy}>
              ?? ??????????????
            </Button>
            <div className={styles.moreWrapper}>
              <Link className={styles.more} to={product.link} view='secondary'>
                ?????????????????? ?? ????????????
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductCard);
