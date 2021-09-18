import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ServicePageTitle from '@Components/ServicePageTitle';
import { MetaData } from '@Types/Meta';
import { PageSiteMapData } from './typings';
import SiteMapFullSection from './elements/SiteMapFullSection';
import styles from './PageSiteMapFull.module.css';

export interface PageSiteMapFullProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageSiteMapData;
  meta: MetaData;
}

const PageSiteMapFull: FC<PageSiteMapFullProps> = (props) => {
  const { className, page, ...restProps } = props;
  const { h1, sitemap } = page;

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.mainContainer}>
        <ServicePageTitle className={styles.title} title={h1} />
      </div>
      <div className={styles.categories}>
        {sitemap.map((item, index) => (
          <SiteMapFullSection
            className={styles.section}
            key={index}
            name={item.title}
            subcategories={item.categories}
            parameters={item.subCategories}
            types={item.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PageSiteMapFull);
