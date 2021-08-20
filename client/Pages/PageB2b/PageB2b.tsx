import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import { PageB2bData } from './typings';
import styles from './PageB2b.module.css';
import Rubrics from './elements';

export interface PageB2bProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageB2bData;
}

const PageB2b: FC<PageB2bProps> = (props) => {
  const { className, page, ...restProps } = props;
  const { banner, texts, rubrics } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.pageTitle}>Мебель для бизнеса</h1>
      <div className={styles.imageWrapper}>
        <Image className={styles.bannerImage} src={banner} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.introduction}>
          {texts.descriptions.map((text, index: number) => (
            <div className={styles.text} key={index}>
              {text}
            </div>
          ))}
        </div>
        <Rubrics rubrics={rubrics} />
      </div>
    </div>
  );
};

export default memo(PageB2b);
