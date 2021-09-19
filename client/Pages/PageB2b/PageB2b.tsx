import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import FeedbackForm from '@Forms/FeedbackForm';
import PressGallery from '@Components/PressGallery';
import SectionShowroomsMap from '@Components/SectionShowroomsMap';
import { PageB2bData } from './typings';
import Advantages from './elements/Advantages';
import Rubrics from './elements/Rubrics';
import styles from './PageB2b.module.css';

export interface PageB2bProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageB2bData;
}

const PageB2b: FC<PageB2bProps> = (props) => {
  const { className, page, ...restProps } = props;
  const { banner, advantages, texts, articles, rubrics, map, sellPoints } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.pageTitle}>{texts.title}</h1>
      <div className={styles.imageWrapper}>
        <Image className={styles.bannerImage} src={banner} />
      </div>
      {advantages?.length > 0 && <Advantages advantages={advantages} texts={texts.descriptions} />}
      <div className={styles.wrapper}>
        <Rubrics rubrics={rubrics} />
      </div>

      <FeedbackForm />

      <div className={styles.sectionPress}>
        <PressGallery articles={articles} />
      </div>

      <div className={styles.mapWrapper}>
        <SectionShowroomsMap map={map} sellPoints={sellPoints} />
      </div>
    </div>
  );
};

export default memo(PageB2b);
