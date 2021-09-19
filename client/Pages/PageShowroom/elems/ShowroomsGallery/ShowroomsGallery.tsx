import { FC, HTMLAttributes, memo, useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import NavSideArrows from '@UI/NavSideArrows';
import Image from '@UI/Image';
import Section from '@Components/Section';
import { SellPointData } from '@Pages/PageContacts/typings';
import styles from './ShowroomsGallery.module.css';

export interface ShowroomsGalleryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sellPoints: SellPointData[];
}

const ShowroomsGallery: FC<ShowroomsGalleryProps> = (props) => {
  const { className, sellPoints, ...restProps } = props;
  const { isMobileM } = useMedias();
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const tabs = useMemo(() => {
    const result: Tab[] = [];

    sellPoints.forEach((sellPoint) => {
      if (!sellPoint.name || sellPoint.images.length < 1) return;

      result.push({ id: sellPoint.name, label: sellPoint.name });
    });

    return result;
  }, [sellPoints]);

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const selectedShowroomImages = useMemo(() => {
    return sellPoints.find((sellPoint) => sellPoint.name === selectedTab).images;
  }, [sellPoints, selectedTab]);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlideIndex(current);
  }, []);

  const normalizeSlide = useCallback(
    (index: number) => {
      if (index < 0) return 0;
      if (index > selectedShowroomImages.length) return selectedShowroomImages.length;

      return index;
    },
    [selectedShowroomImages.length],
  );

  const handlePrev = useCallback(() => {
    setSlideIndex((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    if (track && track.finished) return;

    setSlideIndex((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  const handleChangeTab = useCallback((_e, tab) => {
    setSelectedTab(tab.id);
    setSlideIndex(0);
  }, []);

  return (
    <div {...restProps} className={cn(styles.slider, className)}>
      <div className={styles.wrapper}>
        <div className={styles.separator} />
      </div>

      <Section className={styles.title} title='Магазины Диван.ру' />

      <div className={styles.tabWrapper}>
        <ButtonTabs
          scrollable
          defaultValue={selectedTab}
          tabs={tabs}
          onChangeTab={handleChangeTab}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.galleryInner}>
          {!isMobileM && <NavSideArrows onPrev={handlePrev} onNext={handleNext} />}

          <Gallery
            className={styles.gallery}
            slideIndex={slideIndex}
            onChangeProgress={handleChangeProgress}
            onChangeCurrent={handleChangeCurrent}
          >
            {selectedShowroomImages.map((src, index) => (
              <div key={index} className={styles.slideWrapper}>
                <div className={styles.slide}>
                  <Image className={styles.imgWrapper} src={src} />
                </div>
              </div>
            ))}
          </Gallery>
        </div>

        {!isMobileM && (
          <div className={styles.galleryPaginationWrapper}>
            <Gallery className={styles.galleryPagination} slideIndex={slideIndex}>
              {selectedShowroomImages.map((src, index) => (
                <div
                  key={index}
                  className={cn(styles.slidePagination, {
                    [styles.actived]: slideIndex === index,
                  })}
                  onClick={() => handleChangeCurrent({ current: index })}
                >
                  <Image className={styles.imgWrapper} src={src} />
                </div>
              ))}
            </Gallery>
          </div>
        )}
      </div>

      {track?.width < 100 && (
        <div className={styles.wrapper}>
          <ProgressBar track={track} />
        </div>
      )}
    </div>
  );
};

export default memo(ShowroomsGallery);
