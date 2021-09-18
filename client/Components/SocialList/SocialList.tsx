import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import IconSocial from './elems/IconSocial';
import styles from './SocialList.module.css';

export interface SocialItem {
  link?: string;
  iconType?: string;
}

export interface SocialListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  items: SocialItem[];
}

const SocialList: FC<SocialListProps> = (props) => {
  const { className, items } = props;

  return (
    <ul className={cn(styles.socialList, className)}>
      {items.map((item) => {
        return (
          <div key={item.link} className={styles.item}>
            <IconSocial type={item.iconType} link={item.link} />
          </div>
        );
      })}
    </ul>
  );
};

export default SocialList;
