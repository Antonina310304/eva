import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery from '@UI/Gallery';
import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import ProgressBar from '@UI/ProgressBar';
import { ProductData } from '@Types/Product';
import styles from './CrossSaleSection.module.css';

export interface CrossSaleSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  products: ProductData[];
  tabs?: Tab[];
}

const CrossSaleSection: FC<CrossSaleSectionProps> = (props) => {
  const { className, title, products, tabs, ...restProps } = props;
  const [slide, setSlide] = useState(0);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  return (
    <Section {...restProps} className={cn(styles.section, className)} title={title}>
      {tabs.length > 0 && (
        <ButtonTabs
          className={styles.tabs}
          defaultValue='0'
          tabs={[
            { id: '0', label: 'Все категории' },
            { id: '1', label: 'Диваны' },
            { id: '2', label: 'Кресла' },
            { id: '3', label: 'Пуфы' },
          ]}
        />
      )}

      <div className={styles.wrapperGallery}>
        <Gallery
          className={styles.gallery}
          cnViewport={styles.galleryViewport}
          onChangeCurrent={handleChangeCurrent}
        >
          {products.map((product) => (
            <div className={styles.item}>
              <CrossSaleProductCard product={product} key={product.id} />
            </div>
          ))}
        </Gallery>
        <ProgressBar currentItem={slide} totalItems={products.length} />
      </div>
    </Section>
  );
};

export default memo(CrossSaleSection);
