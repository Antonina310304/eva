import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import NavArrows from '@UI/NavArrows';
import Image from '@UI/Image';
import ProgressBar from '@UI/ProgressBar';
import useModals from '@Hooks/useModals';
import styles from './Project.module.css';

export interface ProjectItem {
  height?: number;
  projectId?: number;
  src?: string;
  text?: string[];
  title?: string;
  width?: number;
  length?: number;
  slice?: any;
}

export interface ExamplesData {
  height: number;
  projectId: number;
  src: string;
  text: string[];
  title: string;
  width: number;
  length: number;
}

export interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  examples: ExamplesData[];
  index: number;
}

const Project: FC<ProjectProps> = (props) => {
  const { className, index, examples, ...restProps } = props;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [, { openModal }] = useModals();

  const projectsMap = {};
  examples.forEach((example) => {
    if (!projectsMap[example.projectId]) {
      projectsMap[example.projectId] = example;
    }
  });
  const uniqueProjects: ProjectItem = Object.values(projectsMap);

  /* eslint-disable no-param-reassign */
  const gallery = examples.reduce((a, c) => {
    a[c.projectId] = a[c.projectId] || [];
    a[c.projectId].push(c);
    return a;
  }, {});
  /* eslint-enable no-param-reassign */

  const images = Object.values(gallery);

  const handleOpen = useCallback(
    (e, projectIndex) => {
      if (window.cancelClick) return;

      openModal('Project', { images, projectIndex, uniqueProjects });
    },
    [images, uniqueProjects, openModal],
  );

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
    <div {...restProps} className={cn(styles.wrapperGallery, className)}>
      <Section
        {...restProps}
        className={cn(styles.section, className)}
        additional={<NavArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />}
        key={index}
      >
        <div className={styles.wrapperGallery}>
          <Gallery
            className={styles.gallery}
            slideIndex={slide}
            key={images.length}
            onChangeCurrent={handleChangeCurrent}
            onChangeProgress={handleChangeProgress}
          >
            {(images[index] as any[]).map((element, elementIndex) => (
              <div
                className={styles.galleryItem}
                key={elementIndex}
                onClick={(e) => handleOpen(e, index)}
              >
                <Image
                  className={
                    element.height / element.width < 1 ? styles.horizontal : styles.vertical
                  }
                  src={element.src}
                />
              </div>
            ))}
          </Gallery>
          <ProgressBar className={styles.progressBar} track={track} />
        </div>
      </Section>
    </div>
  );
};

export default memo(Project);
