import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Gallery from '@UI/Gallery';
import { siteNavList } from '@Components/Header/data';
import styles from './SiteNavMobile.module.css';

export interface SiteNavProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  activeMenu: string;
  setActiveMenu: (arg: string) => void;
}

const SiteNavMobile: FC<SiteNavProp> = ({ activeMenu, setActiveMenu }) => {
  return (
    <div className={styles.wrapper}>
      <Gallery className={styles.siteNav} gap={20}>
        {siteNavList.map((item) => (
          <div key={item.title}>
            <Link
              preventDefault
              onClick={() => setActiveMenu(item.link)}
              className={cn(styles.link, { [styles.actived]: item.link === activeMenu })}
              to={item.link}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </Gallery>
    </div>
  );
};

export default memo(SiteNavMobile);
