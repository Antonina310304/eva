import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import ProgressBar from '@UI/ProgressBar';
import List from '@UI/List';
import { ProductData } from '@Types/Product';
import styles from './CrossSaleSection.module.css';

export interface CrossSaleSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  products: ProductData[];
  tabs?: Tab[];
}

const CrossSaleSection: FC<CrossSaleSectionProps> = (props) => {
  const { className, title, products, tabs = [], ...restProps } = props;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  return (
    <Section {...restProps} className={cn(styles.section, className)} title={title}>
      {tabs.length > 0 && <ButtonTabs className={styles.tabs} defaultValue='0' tabs={tabs} />}

      <div className={styles.wrapperGallery}>
        <Gallery
          className={styles.gallery}
          cnViewport={styles.galleryViewport}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={handleChangeProgress}
        >
          {products.map((product) => (
            <div className={styles.item} key={product.id}>
              <CrossSaleProductCard product={product} />
            </div>
          ))}
        </Gallery>

        <ProgressBar track={track} />
      </div>
    </Section>
  );
};

export default memo(CrossSaleSection);
