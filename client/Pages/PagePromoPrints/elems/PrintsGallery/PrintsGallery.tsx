import React, { FC, HTMLAttributes, memo, useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import { PrintSliderData } from '@Types/PrintOffers';
import Gallery from '@UI/Gallery';
import Tabs from '@Pages/PagePromoPrints/elems/PrintsGallery/elems/Tabs';
import NavSideArrows from '@UI/NavSideArrows';
import useMedias from '@Hooks/useMedias';

import styles from './PrintsGallery.module.css';

export interface PrintsGalleryProps extends HTMLAttributes<HTMLDivElement> {
  sliderData: PrintSliderData;
}
const PrintsGallery: FC<PrintsGalleryProps> = ({ sliderData }) => {
  const [slide, setSlide] = useState(1);
  const [tab, setTab] = useState(sliderData.offers[0].printId);
  const [animateTab, setAnimateTab] = useState(false);
  const { isMobile } = useMedias();
  const ANIMATE_SPEED = 700;

  const filteredPrints = useMemo(() => {
    const filteredOffers = sliderData.offers.filter((offer) => {
      return offer.printId === tab;
    });

    if (isMobile) {
      return filteredOffers;
    }
    return [filteredOffers[filteredOffers.length - 1], ...filteredOffers, filteredOffers[0]];
  }, [sliderData, tab, isMobile]);

  const tabPrints = useMemo(() => {
    return sliderData.offers.reduce((acc, item) => {
      const res = acc.find((i) => i.id === item.printId);
      if (!res) {
        const currTab = sliderData.prints.find((print) => print.id === item.printId);
        acc.push({ ...currTab });
      }
      return acc;
    }, []);
  }, [sliderData]);

  const normalizeSlide = useCallback(
    (value: number) => {
      const lastElementIndex = isMobile ? filteredPrints.length - 1 : filteredPrints.length - 3;
      if (value < 0) return 0;

      if (value > lastElementIndex) {
        return lastElementIndex;
      }
      return value;
    },
    [filteredPrints, isMobile],
  );

  const handleChangeCurrent = useCallback(
    ({ current }) => {
      if (isMobile) {
        setSlide(normalizeSlide(current));
        return;
      }
      if (current > filteredPrints.length - 3) {
        return;
      }
      setSlide(current);
    },
    [filteredPrints.length, isMobile, normalizeSlide],
  );

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev + 1));
  }, [setSlide, normalizeSlide]);

  const handlerTabClick = useCallback((currentTab) => {
    setTab(currentTab);

    /* включение выключении анимации шторки */
    setAnimateTab(true);
    setTimeout(() => {
      setAnimateTab(false);
    }, ANIMATE_SPEED);
    setSlide(1);
  }, []);

  const activeSlide = useMemo(() => {
    return isMobile ? slide : slide + 1;
  }, [isMobile, slide]);

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: `${tabPrints.find((print) => print.id === tab).color}` }}
    >
      <div
        className={cn(animateTab && styles.active, styles.curtain)}
        style={{ backgroundImage: `url(${tabPrints.find((print) => print.id === tab).preview})` }}
      />
      <div className={styles.inner}>
        <Tabs tabList={tabPrints} activeIdTab={tab} handlerClick={handlerTabClick} />
        <div className={styles.sliderWrapper}>
          <div className={styles.slider}>
            <NavSideArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />
            <Gallery
              slideIndex={slide}
              className={styles.sliderIn}
              onChangeCurrent={handleChangeCurrent}
            >
              {filteredPrints.map((item, index) => {
                const activeElem = index === activeSlide;
                return (
                  <div key={index} className={cn(activeElem && styles.active, styles.slideWrapper)}>
                    <div className={styles.slideInner}>
                      <div className={styles.imgWrapper}>
                        <img className={styles.img} src={item.image} alt='' />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Gallery>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.productName}>{filteredPrints[activeSlide].name}</p>
          <div className={styles.discount}>
            <div className={styles.discountIn}>
              {filteredPrints[activeSlide].price?.old && (
                <p className={styles.priceOld}>
                  {`${filteredPrints[activeSlide].price?.old.toLocaleString()} ₽`}
                </p>
              )}
              <p className={styles.priceCurrent}>
                {`${filteredPrints[activeSlide].price.current.toLocaleString()} ₽`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PrintsGallery);
