import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Collapse from '@UI/Collapse';
import Gallery from '@UI/Gallery';
import useMedias from '@Hooks/useMedias';
import { CartProductData } from '@Types/Cart';
import Minimize from '../Minimize';
import Preview from '../Preview';
import RelatedProductCard from '../RelatedProductCard';
import styles from './RelatedProducsSection.module.css';

export interface RelatedProducsSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  products?: CartProductData[];
}

const RelatedProducsSection: FC<RelatedProducsSectionProps> = (props) => {
  const { className, title, products, ...restProps } = props;
  const { isMobile } = useMedias();
  const [collapsed, setColalpsed] = useState(true);

  const handleClickHead = useCallback(() => {
    setColalpsed((prev) => !prev);
  }, []);

  return (
    <div
      {...restProps}
      className={cn(styles.section, { [styles.collapsed]: collapsed }, className)}
    >
      <div className={styles.head} onClick={handleClickHead}>
        <div className={styles.title}>{title}</div>

        {!isMobile && (
          <div className={styles.wrapperPreviews}>
            <Gallery className={styles.previewsGallery}>
              {products.map((product) => (
                <div className={styles.previewItem} key={product.id}>
                  <Preview product={product} />
                </div>
              ))}
            </Gallery>
          </div>
        )}

        <Minimize className={styles.minimize} collapsed={collapsed} />
      </div>

      <Collapse className={styles.wrapperContent} collapsed={collapsed}>
        <div className={styles.content}>
          <Gallery className={styles.gallery}>
            {products.map((product) => (
              <div className={styles.item} key={product.id}>
                <RelatedProductCard product={product} />
              </div>
            ))}
          </Gallery>
        </div>
      </Collapse>
    </div>
  );
};

export default memo(RelatedProducsSection);
