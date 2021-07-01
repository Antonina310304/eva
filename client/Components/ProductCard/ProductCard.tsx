import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Like from '@Components/Like';
import Fabrics from '@Components/Fabrics';
import ProductTags from '@Components/ProductTags';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import List from '@UI/List';
import Button from '@UI/Button';
import Link from '@UI/Link';
import useMedias from '@Hooks/useMedias';
import { ProductData, ProductParameterGroupData } from '@Types/Product';
import Parameter from './elements/Parameter';
import Sizes from './elements/Sizes';
import FastView from './elements/FastView';
import Preview from './elements/Preview';
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
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;
  const { isOnlyDesktop } = useMedias();

  return (
    <div
      {...restProps}
      className={cn(
        styles.productCard,
        { [styles.hasExpired]: hasExpired, [styles.viewMini]: view === 'mini' },
        className,
      )}
    >
      <div className={styles.box} />

      <div className={styles.container}>
        <div className={styles.containerImage}>
          <Preview className={styles.preview} images={product.images} link={product.link} />

          <div className={styles.actions}>
            <FastView className={cn(styles.action, styles.fastView)} />
            <Like className={cn(styles.action, styles.like)} />
          </div>

          {product.tags?.length > 0 && <ProductTags className={styles.tags} tags={product.tags} />}
        </div>

        <div className={styles.info}>
          <Link className={styles.name} to={product.link} view='simple'>
            {product.name}
          </Link>
          <div className={styles.price}>
            <span className={styles.labelPrice}>{`Цена `}</span>
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
              <Link className={styles.openConstructor} view='secondary' to='#'>
                в конструкторе
              </Link>
            </div>
          </div>
        </div>

        {isOnlyDesktop && (
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
                    const sizes = [];

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

            <Button className={styles.buy} wide title='В корзину' />
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

export default memo(ProductCard);
