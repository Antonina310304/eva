import React, { FC, memo, MouseEvent, useCallback, useMemo, useState } from 'react';

import Section from '@Components/Section';
import { SellPointData } from '@Pages/PageContacts/typings';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import useMedias from '@Hooks/useMedias';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import NavSideArrows from '@UI/NavSideArrows';
import cn from 'classnames';
import styles from './LocationsSlider.module.css';

export interface LocationsSliderProps {
  className?: string;
  pickupPoints: SellPointData[];
}

const LocationsSlider: FC<LocationsSliderProps> = ({ pickupPoints }) => {
  const { isMobileM } = useMedias();
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const tabs = useMemo(() => {
    return pickupPoints.reduce((acc: Tab[], item) => {
      // если нет расположения или изображений
      if (item.name === '' || item.images.length < 1) {
        return acc;
      }
      return [...acc, { id: item.name, label: item.name }];
    }, []);
  }, [pickupPoints]);

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const onChangeTab = useCallback(
    (id) => {
      setSelectedTab(id);
      setSlideIndex(0);
    },
    [setSelectedTab],
  );

  const filteredImageShop = useMemo(() => {
    return pickupPoints.reduce((acc, p) => {
      if (p.name === selectedTab) {
        acc.push(...p.images);
      }
      return acc;
    }, []);
  }, [pickupPoints, selectedTab]);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlideIndex(current);
  }, []);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > filteredImageShop.length) return filteredImageShop.length;

      return value;
    },
    [filteredImageShop.length],
  );

  const handlePrev = useCallback(() => {
    setSlideIndex((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    if (track && track.finished) return;

    setSlideIndex((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  return (
    <div className={styles.slider}>
      <div className={styles.wrapper}>
        <div className={styles.separator} />
      </div>
      <Section className={styles.title} title='Магазины Диван.ру' />
      <div>
        <div className={styles.tabWrapper}>
          <ButtonTabs
            onChangeTab={(event, tab) => onChangeTab(tab.id)}
            scrollable
            defaultValue={selectedTab}
            tabs={tabs}
          />
        </div>
        {/* слайдер */}
        <div className={styles.container}>
          <div className={styles.galleryInner}>
            {!isMobileM && <NavSideArrows onPrev={handlePrev} onNext={handleNext} />}

            <Gallery
              className={styles.gallery}
              slideIndex={slideIndex}
              onChangeProgress={handleChangeProgress}
              onChangeCurrent={handleChangeCurrent}
            >
              {filteredImageShop.map((src) => (
                <div className={styles.slideWrapper}>
                  <div key={src} className={styles.slide}>
                    <div
                      style={{ backgroundImage: `url('${src}')` }}
                      className={styles.imgWrapper}
                    />
                  </div>
                </div>
              ))}
            </Gallery>
          </div>
          {!isMobileM && (
            <div className={styles.galleryPaginationWrapper}>
              <Gallery className={styles.galleryPagination} slideIndex={slideIndex}>
                {filteredImageShop.map((src, index) => {
                  const selected = slideIndex === index;
                  return (
                    <div
                      key={src}
                      onClick={() => handleChangeCurrent({ current: index })}
                      className={cn(styles.slidePagination, { [styles.active]: selected })}
                    >
                      <div
                        style={{
                          backgroundImage: `url('${src}')`,
                        }}
                        className={styles.imgWrapper}
                      />
                    </div>
                  );
                })}
              </Gallery>
            </div>
          )}
        </div>
        {track && track.width < 100 && (
          <div className={styles.wrapper}>
            <ProgressBar track={track} />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(LocationsSlider);
