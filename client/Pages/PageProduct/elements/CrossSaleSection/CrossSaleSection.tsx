import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  memo,
  useCallback,
  useState,
  cloneElement,
} from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import ProgressBar from '@UI/ProgressBar';
import { ProductData } from '@Types/Product';
import styles from './CrossSaleSection.module.css';

export interface RenderItem {
  product: ProductData;
}

export interface CrossSaleSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  products: ProductData[];
  renderItem?: (props: RenderItem) => ReactElement;
  tabs?: Tab[];
}

const CrossSaleSection: FC<CrossSaleSectionProps> = (props) => {
  const { className, title, products, tabs = [], renderItem, ...restProps } = props;
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
          {products.map((product) => {
            const item = renderItem({ product });

            return cloneElement(item, { ...item.props, key: product.id });
          })}
        </Gallery>

        <ProgressBar track={track} />
      </div>
    </Section>
  );
};

export default memo(CrossSaleSection);
