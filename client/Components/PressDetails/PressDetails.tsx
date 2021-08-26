import React, { FC, useCallback, memo } from 'react';

import cn from 'classnames';
import Image from '@UI/Image';
import ProgressBar from '@UI/ProgressBar';
import NewSlider from '@UI/NewSlider';

import useMedias from '@Hooks/useMedias';

import Icon42ArrowRight from '@divanru/icons/dist/42/arrow_right';

import Thumbnails from '@Components/Thumbnails';
import styles from './PressDetails.module.css';

export interface PressDetailsProps {
  className?: string;
  link: string;
  logo: string;
  images: string[];
  title: string;
  text: string;
}

const PressDetails: FC<PressDetailsProps> = (props) => {
  const { className, link, logo, images, title, text } = props;
  const isMobile = useMedias();

  //
  const renderNavigation = useCallback(
    ({ current, total, inViewport, goTo, prev, next }) => {
      if (inViewport) return null;

      return isMobile ? (
        <div className={styles.progressBar}>
          <ProgressBar current={current} count={total} />
        </div>
      ) : (
        <Thumbnails
          className={styles.thumbnails}
          size='s'
          outside
          sliders={images}
          current={current}
          goTo={goTo}
          total={total}
          prev={prev}
          next={next}
          loop
        />
      );
    },
    [images, isMobile],
  );

  return (
    <div className={cn(styles.pressDetails, className)}>
      <div className={styles.carousel}>
        <NewSlider render={renderNavigation} className={styles.slider}>
          {images.map((item, index) => (
            <Image src={item.src} key={index} className={styles.sliderItem} />
          ))}
        </NewSlider>
      </div>
      <div className={styles.info}>
        <Image src={logo} className={styles.logo} />
      </div>
    </div>
  );
};

export default memo(PressDetails);
