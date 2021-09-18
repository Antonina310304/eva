import { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import NavArrows from '@UI/NavArrows';
import Image from '@UI/Image';
import ProgressBar from '@UI/ProgressBar';
import useModals from '@Hooks/useModals';
import { ProjectItem } from '@Pages/PageB2bDetail/typings';
import styles from './Project.module.css';

export interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  examples: ProjectItem[];
  project: ProjectItem;
}

const Project: FC<ProjectProps> = (props) => {
  const { className, project, examples, ...restProps } = props;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [, { openModal }] = useModals();

  const handleOpen = useCallback(
    (e, imageIndex) => {
      if (window.cancelClick) return;

      openModal('Project', { imageIndex, uniqueProjects: examples });
    },
    [examples, openModal],
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
    <div {...restProps} className={cn(styles.project, className)}>
      <Section
        {...restProps}
        className={cn(styles.section, className)}
        additional={<NavArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />}
      >
        <div className={styles.wrapperGallery}>
          <Gallery
            className={styles.gallery}
            slideIndex={slide}
            onChangeCurrent={handleChangeCurrent}
            onChangeProgress={handleChangeProgress}
          >
            {examples.map((element, elementIndex) => (
              <div
                className={styles.galleryItem}
                key={elementIndex}
                onClick={(e) => handleOpen(e, elementIndex)}
              >
                <Image
                  className={cn(styles.galleryImage, {
                    [styles.horizontal]: element.height / element.width < 1,
                    [styles.vertical]: element.height / element.width > 1,
                  })}
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
