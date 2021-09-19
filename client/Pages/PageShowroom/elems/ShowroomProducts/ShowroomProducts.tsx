import { FC, HTMLAttributes, memo, useState } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import ProductCard from '@Components/ProductCard';
import Button from '@UI/Button';
import { ProductData } from '@Types/Product';
import styles from './ShowroomProducts.module.css';

export interface ShowroomProductsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultProducts: ProductData[];
}

const ShowroomProducts: FC<ShowroomProductsProps> = (props) => {
  const { className, defaultProducts, ...restProps } = props;
  const [products, setProducts] = useState<ProductData[]>(defaultProducts);
  const [isLoading, setLoading] = useState(false);

  const mockLoadMore = () => {
    setLoading(true);

    setTimeout(() => {
      const newProducts = [...products, ...defaultProducts];
      setProducts(newProducts);
      setLoading(false);
    }, 500);
  };

  return (
    <Section
      {...restProps}
      className={cn(styles.sectionWrapper, className)}
      title='Товары в шоу-руме'
    >
      <div className={styles.productsWrapper}>
        <div className={styles.productsList}>
          {products.map((item, index) => (
            <div key={index} className={styles.productItem}>
              <ProductCard product={item} view='mini' />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <Button
          className={styles.btn}
          theme='dirty'
          onClick={mockLoadMore}
          disabled={isLoading}
          waiting={isLoading}
        >
          Смотреть еще
        </Button>
      </div>
    </Section>
  );
};

export default memo(ShowroomProducts);
