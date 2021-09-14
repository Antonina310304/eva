import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import divanSlider from './data';
import styles from './Slider.module.css';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export type SliderData = HTMLAttributes<HTMLDivElement>;

const Slider: FC<SliderData> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (hover) {
      setCurrentIndex((ind) => ind + 1);
    }
  }, [hover]);

  function slideRenderer(params: any) {
    const { index, key } = params;

    return (
      <div className={styles.slide} key={key}>
        <img src={divanSlider[mod(index, divanSlider.length)]} alt='диваны.ру' />
      </div>
    );
  }

  function handleChangeIndex() {
    setCurrentIndex(currentIndex);
  }

  return (
    <VirtualizeSwipeableViews
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      index={currentIndex}
      className={styles.slideContainer}
      containerStyle={{
        width: 78,
        height: 27,
      }}
      onChangeIndex={handleChangeIndex}
      axis='y'
      enableMouseEvents
      slideRenderer={slideRenderer}
    />
  );
};

export default Slider;
