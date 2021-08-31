import React, { FC, HTMLAttributes } from 'react';
import Link from '@UI/Link';

import { ProductSearchData } from '@Types/Product';

import styles from './ProductList.module.css';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  products: ProductSearchData[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <ul className={styles.list}>
        {products.map((item) => (
          <li key={item.id} className={styles.item}>
            <Link className={styles.link} to={item.link} view='simple'>
              <p className={styles.imgWrapper}>
                <img className={styles.img} src={item.img} alt={item.name} />
              </p>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.price}>{`${item.price.toLocaleString('ru')} ₽`}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
