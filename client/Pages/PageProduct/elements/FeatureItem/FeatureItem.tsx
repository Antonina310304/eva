import { FC, HTMLAttributes, useCallback, memo } from 'react';

import cn from 'classnames';

import Image from '@UI/Image';
import Video from '@UI/Video';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import styles from './FeatureItem.module.css';
import iconPlay from './play.svg';

export interface Feature {
  description: string;
  fileVideo: string;
  image: string;
  name: string;
  youtubeVideo: string;
}

export interface FeatureItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  feature: Feature;
}

const FeatureItem: FC<FeatureItemProps> = (props) => {
  const { className, feature, ...restProps } = props;
  const [, { openModal }] = useModals();
  const isMobile = useMedias();

  const handleClick = useCallback(() => {
    if (feature.youtubeVideo !== '') {
      openModal('Video', { videoId: feature.youtubeVideo });
    }
  }, [openModal, feature]);

  return (
    <div {...restProps} className={cn(styles.featuresItem, [className])}>
      <div className={cn(styles.imgWrapper, { [styles.viewVideo]: !!feature.fileVideo })}>
        {feature.image && (
          <Image src={feature.image} className={styles.image} onClick={handleClick} />
        )}
        {feature.youtubeVideo !== '' && (
          <Image src={iconPlay} className={styles.iconPlay} onClick={handleClick} />
        )}
        {feature.fileVideo !== '' && (
          <div className={styles.videoContainer}>
            <Video src={feature.fileVideo} className={styles.video} playOnHover />
            {isMobile && <Image src={iconPlay} className={styles.iconPlay} />}
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
