import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ServicePageTitle from '@Components/ServicePageTitle';
import { MetaData } from '@Types/Meta';
import { PageSiteMapData } from './typings';
import SiteMapSection from './elements/SiteMapSection';
import styles from './PageSiteMap.module.css';

export interface PageSiteMapProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageSiteMapData;
  meta: MetaData;
}

const PageSiteMap: FC<PageSiteMapProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { h1, sitemap } = page;

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.mainContainer}>
        <ServicePageTitle view='bordered' title={h1} />
        <div className={styles.categories}>
          {sitemap.map((item, index) => (
            <SiteMapSection
              className={styles.section}
              key={index}
              name={item.title}
              subcategories={item.categories}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(PageSiteMap);
