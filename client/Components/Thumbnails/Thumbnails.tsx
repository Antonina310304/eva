import React, { useCallback, memo } from 'react';

import cn from 'classnames';
import NewSlider from '@divanru/ts-ui/NewSlider';
import SliderNav from '@divanru/ts-ui/SliderNav';

import ThumbnailsItem from '@Components/ThumbnailsItem';
import styles from './Thumbnails.module.css';

const b = cn('Thumbnails');

const Thumbnails = ({
  className,
  sliders,
  current,
  onClickItem,
  outside = false,
  size,
  loop = false,
  visible_items = null,
}) => {
  const renderNavigation = useCallback(({ current: currentNav, total, inViewport, prev, next }) => {
    if (inViewport) return null;
    return (
      <SliderNav
        className={styles.nav}
        current={currentNav}
        total={total}
        prev={prev}
        next={next}
        view='thumbnail'
        shadow={false}
      />
    );
  }, []);

  return (
    <div className={b({ outside }, [className])}>
      <div className={styles.container}>
        <div className={styles.list}>
          <NewSlider render={renderNavigation} loop={loop}>
            {sliders.map((item, indexSlide) => {
              return (
                <ThumbnailsItem
                  key={indexSlide}
                  className={styles.thumbnailsItem}
                  src={item.type === 'video' ? item.poster : item.src || item}
                  type={item.type}
                  id={item.id || indexSlide}
                  index={indexSlide}
                  isActive={current === indexSlide - 1}
                  onClick={onClickItem}
                  visible_items={visible_items}
                />
              );
            })}
          </NewSlider>
        </div>
      </div>
    </div>
  );
};

export default memo(Thumbnails);
