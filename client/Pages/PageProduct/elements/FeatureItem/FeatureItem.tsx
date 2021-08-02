import React, { FC, HTMLAttributes, useCallback, memo } from 'react';

import cn from 'classnames';

import Image from '@UI/Image';
import Video from '@UI/Video';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';

import styles from './FeatureItem.module.css';

export interface FeatureItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  feature: any;
}

const FeatureItem: FC<FeatureItemProps> = ({ feature, className, ...props }) => {
  const [, { openModal }] = useModals();
  const isMobile = useMedias();

  const onClick = useCallback(() => {
    if (feature.youtubeVideo !== '') {
      openModal('Video', { videoId: feature.youtubeVideo });
    }
  }, [openModal, feature]);

  return (
    <div {...props} className={cn(styles.featuresItem, [className])}>
      <div className={cn(styles.imgWrapper, { [styles.viewVideo]: !!feature.fileVideo })}>
        {feature.image && (
          <Image
            src={feature.image}
            className={cn(styles.image, { [styles.video]: !!feature.youtubeVideo })}
            onClick={onClick}
          />
        )}
        {feature.youtubeVideo !== '' && (
          <Image src='/react/static/video/play.svg' className={styles.iconPlay} onClick={onClick} />
        )}
        {feature.fileVideo !== '' && (
          <div className={styles.videoContainer}>
            <Video src={feature.fileVideo} className={styles.video} loop stopOnScroll playOnHover />
            {!isMobile && <Image src='/react/static/video/play.svg' className={styles.iconPlay} />}
          </div>
        )}
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.name}>{feature.name}</div>
        <div className={styles.description}>{feature.description}</div>
      </div>
    </div>
  );
};

export default memo(FeatureItem);
