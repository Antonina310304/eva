import { FC, HTMLAttributes, memo } from 'react';

import Link from '@UI/Link';
import { IBannerMenu } from '@Types/MainNav';
import Badge from '@UI/Badge';
import styles from './BannerMenu.module.css';

export interface BannerMenuProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
  className?: string;
  banner: IBannerMenu;
}

const BannerMenu: FC<BannerMenuProps> = ({ banner }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.title}>{banner.title}</p>
        <p className={styles.text}>{banner.text}</p>
        <Link to={banner.link}>{banner.textLink}</Link>
      </div>
      <div className={styles.imgWrap}>
        <div className={styles.imgIn}>
          <img src={banner.img} alt={banner.title} />
          <Badge className={styles.badge} badge={banner.badge} />
        </div>
      </div>
    </div>
  );
};

export default memo(BannerMenu);
