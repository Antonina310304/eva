import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import { CartPositionData } from '@Types/Cart';
import MainProductCard from '../MainProductCard';
import styles from './NewPositionsGallery.module.css';

export interface NewPositionsGalleryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  positions?: CartPositionData[];
}

const NewPositionsGallery: FC<NewPositionsGalleryProps> = (props) => {
  const { className, positions, ...restProps } = props;
  const [track, setTrack] = useState<ProgressOptions>(null);

  const handleChangeProgress = useCallback((params) => {
    setTrack(params);
  }, []);

  return (
    <div {...restProps} className={cn(styles.newPositions, className)}>
      <Gallery gap={60} onChangeProgress={handleChangeProgress}>
        {positions.map((position) => {
          return position.products.map((product) => (
            <div className={styles.item} key={product.id}>
              <MainProductCard
                className={styles.newProduct}
                product={product}
                position={position}
                key={product.id}
              />
            </div>
          ));
        })}
      </Gallery>

      {positions.length > 1 && track?.width < 100 && (
        <ProgressBar className={styles.progressBar} track={track} />
      )}
    </div>
  );
};

export default memo(NewPositionsGallery);
