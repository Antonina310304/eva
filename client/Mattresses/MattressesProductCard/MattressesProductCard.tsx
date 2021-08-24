import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import cn from 'classnames';

import Like from '@Components/Like';
import ProductTags from '@Components/ProductTags';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Button from '@UI/Button';
import Link from '@UI/Link';
import MainSelect from '@UI/MainSelect';
import useMedias from '@Hooks/useMedias';
import useModals from '@Hooks/useModals';
import { ProductData, ProductParameterGroupData } from '@Types/Product';
import Parameter from './elements/Parameter';
import FastView from './elements/FastView';
import Preview from './elements/Preview';
import styles from './MattressesProductCard.module.css';

export interface MattressesProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
  view?: 'mini';
}

const MattressesProductCard: FC<MattressesProductCardProps> = (props) => {
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

  const parameterGroups = Object.values(product.parameterGroups);

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
              <Preview className={styles.preview} images={product.images} link={product.link} />

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
          <Link className={styles.name} to={product.link} view='simple'>
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

          {parameterGroups.length > 0 && (
            <div className={styles.parameterGroups}>
              {parameterGroups.map((group: any) => {
                const characteristics: any[] = [];
                const parameters = Object.values(product.parameters).filter(
                  (p: any) => p.groupId === group.id,
                );

                parameters.forEach((parameter: any) => {
                  const value = product.parameterValues.find((v) => v.parameterId === parameter.id);
                  const unit = product.units.find((u) => u.id === value.unitId);

                  characteristics.push({
                    name: parameter.title,
                    value: value.value,
                    icon: value.icon,
                    unit: unit && unit.title ? unit.title : '',
                  });
                });

                switch (group.theme) {
                  case 'hardness':
                    return <Parameter characteristic={characteristics[0]} key={group.id} />;

                  default:
                    return null;
                }
              })}
            </div>
          )}

          {product.variants && (
            <MainSelect
              className={styles.sizes}
              title={product.variants.title}
              options={product.variants.values.map((variant: any, index: number) => ({
                id: variant.id.toString(),
                title: variant.parameters,
                name: variant.parameters,
                href: variant.link,
                price: variant.price,
                selected: index === 0,
              }))}
            />
          )}
        </div>

        {inView && isOnlyDesktop && (
          <div className={styles.additionalInfo}>
            <Button className={styles.buy} wide onClick={handleBuy}>
              В корзину
            </Button>
            <div className={styles.moreWrapper}>
              <Link className={styles.more} to={product.link} view='secondary'>
                Подробнее о товаре
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MattressesProductCard);
