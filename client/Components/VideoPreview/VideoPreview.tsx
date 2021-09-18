import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import styles from './VideoPreview.module.css';

export interface VideoPreviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  src: string;
  cnPreviewHeight?: string;
}

const VideoPreview: FC<VideoPreviewProps> = (props) => {
  const { className, src, cnPreviewHeight, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.videoPreview, className)}>
      <Image className={cn(styles.posterImage, cnPreviewHeight)} src={src} />
      <div className={styles.playIcon} />
    </div>
  );
};

export default memo(VideoPreview);
