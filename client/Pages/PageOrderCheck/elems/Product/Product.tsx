import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { CartProductData } from '@Types/Cart';
import Preview from './elems/Preview';
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
          {product.groups.map((group) => {
            return group.parameters.map((param: any) => (
              <div className={styles.param}>
                {(() => {
                  switch (param.type) {
                    case 'sizes':
                      return <div key={param.id}>Sizes</div>;

                    case 'feature':
                      return <div key={param.id}>Feature</div>;

                    default:
                      return null;
                  }
                })()}
              </div>
            ));
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
