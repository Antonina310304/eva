import { FC, HTMLAttributes, memo, useRef, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import cn from 'classnames';
import useMedias from '@Hooks/useMedias';

import styles from './Video.module.css';

export interface VideoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  src: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  stopOnScroll?: boolean;
  playOnHover?: boolean;
  loop?: boolean;
}

const Video: FC<VideoProps> = (props) => {
  const {
    className,
    src,
    poster = null,
    autoPlay = false,
    controls = false,
    stopOnScroll = false,
    playOnHover = false,
    loop,
    ...restProps
  } = props;
  const video = useRef(null);
  const isMobile = useMedias();

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '100px 0px',
  });
  const [refVideo, inViewVideo] = useInView({
    rootMargin: '0px 0px',
  });

  const handleMouseEnter = useCallback(() => {
    if (!playOnHover) return null;
    return video.current.play();
  }, [playOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (!playOnHover) return null;
    return video.current.pause();
  }, [playOnHover]);

  useEffect(() => {
    if (!video.current) return;

    if ((stopOnScroll && !playOnHover) || (playOnHover && isMobile)) {
      if (inViewVideo) {
        video.current.play();
      } else {
        video.current.pause();
      }
    }
  }, [isMobile, playOnHover, inViewVideo, stopOnScroll]);

  return (
    <div {...restProps} className={cn({}, [className])} ref={ref}>
      {inView && (
        <div
          className={styles.helper}
          ref={refVideo}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            className={styles.player}
            autoPlay={autoPlay}
            controls={controls}
            src={src}
            poster={poster}
            loop={loop}
            muted
            playsInline
            ref={video}
          >
            <source type='video/mp4' src={src} media='(orientation:landscape)' />
          </video>
        </div>
      )}
    </div>
  );
};

export default memo(Video);
