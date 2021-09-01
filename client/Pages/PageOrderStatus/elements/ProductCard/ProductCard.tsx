import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { ProductData } from '@Pages/PageOrderStatus/typings';
import OrderMaterial from '../OrderMaterial';
import PriceContainer from '../PriceContainer';
import CharacteristicsList from '../CharacteristicsList';
import Sizes from '../Sizes';
import styles from './ProductCard.module.css';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultCollapsed?: boolean;
  product: ProductData;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { className, product, defaultCollapsed, ...restProps } = props;
  const hasParameters = product.groups && product.groups.length > 0;

  return (
    <div {...restProps} className={cn(styles.productCard, className)}>
      <div className={styles.content}>
        <div className={styles.productInformation}>
          <img className={styles.image} alt={product.name} src={product.image} />

          <div className={styles.contentContainer}>
            <div className={styles.head}>
              <div className={styles.name}>{`${product.type} ${product.name}`}</div>
              {/* <div className={styles.headInfo}>
                <div className={styles.count}>{`${product.quantity} шт.`}</div>
                <PriceContainer className={styles.price} price={product.price} />
              </div> */}
            </div>

            {hasParameters && (
              <div className={styles.params}>
                {product.groups.map((group, indexGroup) => (
                  <div className={styles.group} key={indexGroup}>
                    {/* {group.title && <div className={styles.groupTitle}>{group.title}</div>} */}
                    {group.parameters.map((parameter: any, indexParameter: number) => {
                      switch (parameter.type) {
                        case 'materials': {
                          return (
                            <div className={styles.materials} key={indexParameter}>
                              {parameter.data.map((material: any, indexMaterial: number) => (
                                <OrderMaterial
                                  className={styles.material}
                                  key={indexMaterial}
                                  material={material}
                                />
                              ))}
                            </div>
                          );
                        }

                        case 'sizes': {
                          return (
                            <Sizes
                              key={indexParameter}
                              sizes={parameter.data.map((size: any) => ({
                                value: `${size.value} ${size.unit}`,
                              }))}
                            />
                          );
                        }

                        case 'feature': {
                          return (
                            <CharacteristicsList
                              key={indexParameter}
                              characteristics={parameter.data.map((feature: any) => ({
                                name: `${feature.title}: `,
                                value: feature.value,
                              }))}
                            />
                          );
                        }

                        default:
                          return null;
                      }
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.priceBlock}>
          <div className={styles.count}>{`${product.quantity} шт.`}</div>
          <PriceContainer className={styles.price} price={product.price} />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
