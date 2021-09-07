import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import NavArrows from '@UI/NavArrows';
import Image from '@UI/Image';
import ProgressBar from '@UI/ProgressBar';
import { PageB2bDetailData } from './typings';
import styles from './PageB2bDetail.module.css';

export interface PageB2bDetailProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: типизируй меня полностью
  page: PageB2bDetailData;
}

const PageB2bDetail: FC<PageB2bDetailProps> = (props) => {
  const { className, page, ...restProps } = props;
  const { title, teaser, examples } = page;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const projectsMap = {};
  examples.forEach((example) => {
    if (!projectsMap[example.projectId]) {
      projectsMap[example.projectId] = example;
    }
  });
  const projects = Object.values(projectsMap);
  const [visibleItems, setVisibleItems] = useState(examples.length > 3 ? 3 : examples.length);

  const onClickMore = useCallback(() => {
    setVisibleItems(visibleItems + 3);
  }, [visibleItems]);

  const balance = projects.length - visibleItems;

  /* eslint-disable no-param-reassign */
  const gallery = examples.reduce((a, c) => {
    a[c.projectId] = a[c.projectId] || [];
    a[c.projectId].push(c);
    return a;
  }, {});
  /* eslint-enable no-param-reassign */

  const subGallery = Object.values(gallery);
  console.log(subGallery);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > examples.length) return examples.length;

      return value;
    },
    [examples.length],
  );

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    if (track.finished) return;

    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.teaserWrapper}>
        <div className={styles.teaser}>{teaser}</div>
      </div>
      <h2 className={styles.subheading}>{projects.title}</h2>
      {projects.slice(0, visibleItems).map((item, index) => (
        <div className={styles.contentWrapper}>
          <Section
            {...restProps}
            className={cn(styles.section, className)}
            additional={
              <NavArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />
            }
            key={index}
          >
            <div className={styles.wrapperGallery}>
              <Gallery
                className={styles.gallery}
                slideIndex={slide}
                key={subGallery.length}
                onChangeCurrent={handleChangeCurrent}
                onChangeProgress={handleChangeProgress}
              >
                {subGallery[index].map((element, elementIndex) => (
                  <div className={styles.galleryItem} key={elementIndex}>
                    <Image className={styles.galleryImage} src={element.src} />
                  </div>
                ))}
              </Gallery>
            </div>
          </Section>

          <ProgressBar className={styles.progressBar} track={track} />
          <div className={styles.descriptionWrapper}>
            <h3 className={styles.projectName}>{item.title}</h3>
            <div className={styles.textWrapper}>
              {item.text.map((elem, elemIndex: number) => (
                <div className={styles.description} key={elemIndex}>
                  {elem}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {balance > 0 && (
        <div className={styles.buttonWrapper}>
          <Button className={styles.button} type='button' theme='dirty' onClick={onClickMore}>
            {`Смотреть еще ${balance}`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(PageB2bDetail);
