import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import { InstagramPostData } from '@Types/InstagramPost';
import Post from './elems/Post';
import PromoPlaceholder from './elems/PromoPlaceholder';
import styles from './InstagramGallery.module.css';

export interface InstagramGalleryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  slideIndex?: number;
  posts: InstagramPostData[];
  cnViewport?: string;
  hasPromoPlaceholder?: boolean;
  onChangeProgress?(opts: ProgressOptions): void;
  onChangeCurrent?(state: any): void;
}

const InstagramGallery: FC<InstagramGalleryProps> = (props) => {
  const {
    className,
    slideIndex,
    cnViewport,
    posts,
    hasPromoPlaceholder,
    onChangeProgress,
    onChangeCurrent,
    ...restProps
  } = props;
  const [track, setTrack] = useState<ProgressOptions>(null);

  const handleChangeProgress = useCallback(
    (opts: ProgressOptions) => {
      setTrack(opts);

      if (onChangeProgress) onChangeProgress(opts);
    },
    [onChangeProgress],
  );

  return (
    <div {...restProps} className={cn(styles.instagram, className)}>
      <Gallery
        className={styles.gallery}
        cnViewport={cnViewport}
        slideIndex={slideIndex}
        onChangeProgress={handleChangeProgress}
        onChangeCurrent={onChangeCurrent}
      >
        {hasPromoPlaceholder && (
          <div className={styles.item}>
            <PromoPlaceholder />
          </div>
        )}
        {posts.map((post) => (
          <div className={styles.item} key={post.id}>
            <Post className={styles.post} post={post} />
          </div>
        ))}
      </Gallery>

      {track && track.width < 100 && <ProgressBar className={styles.track} track={track} />}
    </div>
  );
};

export default memo(InstagramGallery);
