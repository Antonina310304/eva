import React, { FC, memo, useState, useCallback } from 'react';

import { ProductData } from '@Types/Product';
import Section from '@Components/Section';
import ProductCard from '@Components/ProductCard';
import Button from '@UI/Button';
import mockProductsData from './mockProductsData';

import styles from './Showroom.module.css';

const mockProducts = (mockProductsData as unknown) as ProductData[]; // скопированы данные, которые приходят с сервера для другого аналогичного компонента

const Showroom: FC = () => {
  const [products, setProducts] = useState<ProductData[]>(mockProducts);
  const [isLoading, setLoading] = useState(false);

  const mockLoadMore = () => {
    setLoading(true);

    setTimeout(() => {
      const newProducts = [...products, ...mockProducts];
      setProducts(newProducts);
      setLoading(false);
    }, 500);
  };

  const renderProducts = useCallback(() => {
    return products.map((item, index) => {
      return (
        <li key={index} className={styles.productItem}>
          <ProductCard product={item} view='mini' />
        </li>
      );
    });
  }, [products]);

  return (
    <Section className={styles.sectionWrapper} title='Товары в шоу-руме'>
      <div className={styles.productsWrapper}>
        {!!products.length && <ul className={styles.productsList}>{renderProducts()}</ul>}
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

export default memo(Showroom);
