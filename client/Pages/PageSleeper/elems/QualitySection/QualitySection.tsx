import React, { FC, memo, useCallback, useState } from 'react';
import AsyncVimeo from '@Modals/QualityGuaranteeModal/elems/AsyncVimeo';
import VideoPreview from '@Components/VideoPreview/VideoPreview';
import useMedias from '@Hooks/useMedias';
import cn from 'classnames';
import styles from './QualitySection.module.css';

interface QualitySectionProps {
  className?: string;
  previewImageSrc: string;
  videoId: string;
}

const QualitySection: FC<QualitySectionProps> = ({ className, previewImageSrc, videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { isMobile } = useMedias();

  const handleClickPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>Качество, проверенное на практике</h2>
        <div className={styles.description}>
          Матрас Sleeper прошел все необходимые испытания на прочность. Автоматика, независимые
          эксперты, а главное — настоящие владельцы — признали его удобство и качество.
        </div>
      </div>

      <div className={cn(styles.videoContent)}>
        {isPlaying ? (
          <AsyncVimeo className={styles.video} video={videoId} autoplay muted={isMobile} />
        ) : (
          <VideoPreview
            src={previewImageSrc}
            cnPreviewHeight={styles.preview}
            onClick={handleClickPlay}
          />
        )}
      </div>
    </div>
  );
};

export default memo(QualitySection);
