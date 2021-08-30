import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { CartProductData } from '@Types/Cart';
import Preview from './elems/Preview';
import Material from './elems/Material';
import styles from './Product.module.css';

export interface ProductProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: CartProductData;
}

const Product: FC<ProductProps> = (props) => {
  const { className, product, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.product, className)}>
      <Preview className={styles.preview} product={product} />

      <div className={styles.content}>
        <div className={styles.name}>{product.name}</div>

        <div className={styles.params}>
          {product.groups.map((group, indexGroup) => {
            return group.parameters.map((param: any) => {
              switch (param.type) {
                case 'sizes': {
                  const sizes = param.data
                    .map((item: any) => `${item.value} ${item.unit}`)
                    .join(' x ');

                  return <div className={styles.param} key={indexGroup}>{`Размеры: ${sizes}`}</div>;
                }

                case 'feature': {
                  return (param.data as any[]).map(({ title, value }, indexData) => (
                    <div className={styles.param} key={`${indexGroup}-${indexData}`}>
                      {`${title}: ${value}`}
                    </div>
                  ));
                }

                case 'materials': {
                  return (param.data as any[]).map((material, indexData) => (
                    <Material
                      className={styles.param}
                      key={`${indexGroup}-${indexData}`}
                      material={material}
                    />
                  ));
                }

                default:
                  return null;
              }
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
