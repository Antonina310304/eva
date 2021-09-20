import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Slider from 'react-slick';
import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import { MetaData } from '@Types/Meta';
import Select, { SelectItemData } from '@UI/Select';
import SampleOption from '@UI/MainSelect/elems/SampleOption/SampleOption';
import MainSelect from '@UI/MainSelect';
import Gallery from '@UI/Gallery';
import styles from './PageIndex.module.css';

import './slick.css';
import './slick-theme.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const [, { openModal }] = useModals();
  const [slide, setSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: 0,
  };

  const handleClickButton = useCallback(() => {
    openModal('RegionSelector');
  }, [openModal]);
  const items: SelectItemData[] = [
    { id: 'test21', title: 'test21', name: 'test1' },
    { id: 'test2', title: 'test2', name: 'test2' },
    { id: 'test3', title: 'test3', name: 'test3' },
    { id: 'test4', title: 'test4', name: 'test4' },
    { id: 'test5', title: 'test5', name: 'test5' },
    { id: 'test6', title: 'test6', name: 'test6' },
  ];

  const slider = [
    { img: 'react/static/img/slider-3.png' },
    { img: 'react/static/img/slider-1.png' },
    { img: 'react/static/img/slider-2.png' },
    { img: 'react/static/img/slider-3.png' },
    { img: 'react/static/img/slider-1.png' },
  ];

  const handleChangeCurrent = useCallback(
    ({ current }) => {
      if (current > slider.length - 3) {
        return;
      }
      setSlide(current);
    },
    [slider],
  );

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.title}>EVA / PageIndex</div>

      <MainSelect
        className={styles.select}
        mode='single'
        items={items}
        defaultChecked={items[0]}
        renderItem={(itemProps: SelectItemData) => {
          return <SampleOption item={itemProps} />;
        }}
      />
      <div className={styles.wrap}>
        <Slider {...settings}>
          {slider.map((item, index) => {
            return (
              <div key={index} className={styles.wrapperSlide}>
                <div>
                  <div>
                    <p>
                      слайдер
                      {index}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* <div className={styles.slider}> */}
      {/*  <Gallery */}
      {/*    slideIndex={slide} */}
      {/*    className={styles.sliderIn} */}
      {/*    onChangeCurrent={handleChangeCurrent} */}
      {/*  > */}
      {/*    {slider.map((item, index) => { */}
      {/*      const activeElem = index - 1 === slide; */}
      {/*      return ( */}
      {/*        <div key={index} className={styles.slideWrapper}> */}
      {/*          <div className={cn(activeElem && styles.active, styles.slideInner)}> */}
      {/*            <div className={styles.imgWrapper}> */}
      {/*              <img className={styles.img} src={item.img} alt='' /> */}
      {/*            </div> */}
      {/*          </div> */}
      {/*        </div> */}
      {/*      ); */}
      {/*    })} */}
      {/*  </Gallery> */}
      {/* </div> */}

      <Button onClick={handleClickButton}>Change region</Button>
    </div>
  );
};

export default memo(PageIndex);
