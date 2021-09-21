import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import * as ApiSite from '@Api/Site';
import Section from '@Components/Section';
import ProductCard from '@Components/ProductCard';
import Button from '@UI/Button';
import logger from '@Utils/logger';
import { CatalogData } from '@Types/Catalog';
import styles from './ShowroomProducts.module.css';

export interface ShowroomProductsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  defaultCatalog: CatalogData;
}

const ShowroomProducts: FC<ShowroomProductsProps> = (props) => {
  const { className, title, defaultCatalog, ...restProps } = props;
  const [catalog, setCatalog] = useState(defaultCatalog);
  const [isLoading, setLoading] = useState(false);

  const handleClickMore = useCallback(async () => {
    setLoading(true);

    try {
      const res = await ApiSite.getProductsByCategoryTranslite({
        translite: catalog.translite,
        page: catalog.page + 1,
      });

      setCatalog((prev) => ({
        ...prev,
        ...res,
        products: [...prev.products, ...res.products],
      }));
    } catch (err) {
      logger(err);
    } finally {
      setLoading(false);
    }
  }, [catalog.page, catalog.translite]);

  return (
    <Section {...restProps} className={cn(styles.sectionWrapper, className)} title={title}>
      <div className={styles.productsWrapper}>
        <div className={styles.productsList}>
          {catalog.products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <ProductCard product={product} view='mini' />
            </div>
          ))}
        </div>
      </div>

      {catalog.productsCountLeft && (
        <div className={styles.btnWrapper}>
          <Button
            className={styles.btn}
            theme='dirty'
            disabled={isLoading}
            waiting={isLoading}
            onClick={handleClickMore}
          >
            Смотреть еще
          </Button>
        </div>
      )}
    </Section>
  );
};

export default memo(ShowroomProducts);
