import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Like from '@Components/Like';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import List from '@UI/List';
import Button from '@UI/Button';
import Link from '@UI/Link';
import { ProductData, ProductParameterGroupData, ProductTagData } from '@Types/Product';
import Tag from './elements/Tag';
import Parameter from './elements/Parameter';
import Sizes from './elements/Sizes';
import FastView from './elements/FastView';
import Fabrics from './elements/Fabrics';
import transformImage from './transformImage';
import fabricImages from './fabrics';
import styles from './ProductCard.module.css';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
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
  const { className, product, ...restProps } = props;
  const [firstImage] = product.images || [];
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  return (
    <div
      {...restProps}
      className={cn(styles.productCard, { [styles.hasExpired]: hasExpired }, className)}
    >
      <div className={styles.box} />

      <div className={styles.container}>
        <div className={styles.containerImage}>
          <div
            className={styles.image}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: transformImage(firstImage.src, '#f5f3f1') }}
          />

          <div className={styles.actions}>
            <FastView className={cn(styles.action, styles.fastView)} />
            <Like className={cn(styles.action, styles.like)} />
          </div>

          {product.tags.length > 0 && (
            <List
              className={styles.tags}
              items={product.tags}
              renderChild={(tag: ProductTagData) => <Tag className={styles.tag} tag={tag} />}
            />
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>
            {`Цена `}
            <Price className={styles.actualPrice} price={product.price.actual} />
            {hasExpired && (
              <Price expired className={styles.expiredPrice} price={product.price.expired} />
            )}
            {hasDiscount && (
              <Discount className={styles.discount}>{product.price.discount}</Discount>
            )}
          </div>
        </div>

        <div className={styles.additionalInfo}>
          <div className={styles.fabricsWrapper}>
            <Fabrics
              className={styles.fabrics}
              fabrics={fabrics}
              defaultSelectedFabric={fabrics[0]}
            />
            <div className={styles.fabricsMore}>
              {`+150 тканей в `}
              <Link view='secondary' href='#'>
                конструкторе
              </Link>
            </div>
          </div>

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
                    sizes.push({
                      title: parameter.title,
                      value: '100 см',
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
            <Link className={styles.more} href={product.link} view='secondary'>
              Подробнее о товаре
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
