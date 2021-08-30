import React, { FC, memo, useCallback, useState } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';
import { useInView } from 'react-intersection-observer';

import { ProductModelProps } from './ProductModel';
import styles from './LazyProductModel.module.css';

const ProductModel = loadable(() => import('./ProductModel'), { ssr: false });

const LazyProductModel: FC<ProductModelProps> = (props) => {
  const { className } = props;
  const [loaded, setLoaded] = useState(false);
  const [ref, inView] = useInView({ rootMargin: '100px 0px', triggerOnce: true });

  const handleViewerReady = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {inView && (
        <ProductModel
          {...props}
          className={cn(styles.model, { [styles.loaded]: inView && loaded }, className)}
          onViewerReady={handleViewerReady}
        />
      )}
      {!loaded && <div className={cn(styles.preloader, className)} ref={ref} />}
    </>
  );
};

export default memo(LazyProductModel);
