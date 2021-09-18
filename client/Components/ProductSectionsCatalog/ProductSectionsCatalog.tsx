import {
  FC,
  HTMLAttributes,
  MouseEvent,
  memo,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import cn from 'classnames';

import Button from '@UI/Button/Button';
import { CatalogData } from '@Types/Catalog';
import { ProductData } from '@Types/Product';
import Section, { RenderProduct, SectionItem } from './elements/Section';
import styles from './ProductSectionsCatalog.module.css';

export interface ProductSectionsCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pages?: CatalogData[];
  hasNextPage?: boolean;
  autoload?: boolean;
  renderProduct: RenderProduct;
  onMore?: (e: MouseEvent) => void;
}

const ProductSectionsCatalog: FC<ProductSectionsCatalogProps> = (props) => {
  const { className, pages, hasNextPage, autoload, renderProduct, onMore, ...restProps } = props;
  const ref = useRef<HTMLDivElement>();

  const products = useMemo(() => {
    let result: ProductData[] = [];

    pages.forEach((page) => {
      result = result.concat(page.products);
    });

    return result;
  }, [pages]);

  const getProductsBySection = useCallback(
    (modelId: number) => {
      return products.filter((product) => product.modelId === modelId);
    },
    [products],
  );

  // Автоподгрузка при скроле
  const handleScroll = useCallback(
    (e) => {
      if (!autoload || !onMore) return;

      const pageYOffsetBottom = window.pageXOffset + document.documentElement.clientHeight;
      const rect = ref.current.getBoundingClientRect();
      const distance = 200;

      if (pageYOffsetBottom > rect.bottom - distance) {
        onMore(e);
      }
    },
    [autoload, onMore],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div {...restProps} className={cn(styles.catalog, className)} ref={ref}>
      <div className={styles.sections}>
        {pages.map((page) => {
          return page.productsModel.map((productModel) => {
            const sectionProducts = getProductsBySection(productModel.id);
            const items: SectionItem[] = [...sectionProducts];

            if (items.length < 1) return null;
            if (productModel.constructor) items.push({ id: 'stub', ...productModel.constructor });

            return (
              <Section
                className={styles.section}
                productModel={productModel}
                items={items}
                renderProduct={renderProduct}
                key={productModel.id}
              />
            );
          });
        })}
      </div>

      {hasNextPage && (
        <div className={styles.moreWrapper}>
          <Button className={styles.moreButton} theme='dirty' onClick={onMore}>
            Смотреть еще
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(ProductSectionsCatalog);
