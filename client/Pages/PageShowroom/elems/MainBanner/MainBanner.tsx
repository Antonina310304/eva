import React, { FC, memo } from 'react';

import cn from 'classnames';
import Button from '@UI/Button';
import useMedias from '@Hooks/useMedias';
import styles from './MainBanner.module.css';

interface MainBannerProps {
  className?: string;
  title: string;
  description: string;
  button: {
    title: string;
    link: string;
  };
  imageUrl: string;
}

const MainBanner: FC<MainBannerProps> = ({ className, imageUrl, title, button, description }) => {
  const { isMobile, isMobileM } = useMedias();

  const wrapperStyle = React.useMemo(() => {
    if (isMobileM && !isMobile) return { background: `url(${imageUrl}) center center / cover` };
    return {};
  }, [isMobile, isMobileM, imageUrl]);

  return (
    <div className={cn(className, styles.wrapper)} style={wrapperStyle}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <Button theme='primary' className={styles.button}>
            {button.title}
          </Button>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} className={styles.img} />
      </div>
    </div>
  );
};

export default memo(MainBanner);
