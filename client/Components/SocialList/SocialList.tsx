import React, { FC, HTMLAttributes } from 'react';
import { IconData } from '@Types/IconSocial';
import IconSocial from '@UI/IconSocial/IconSocial';
import cn from 'classnames';
import styles from './SocialList.module.css';

export interface SocialListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  list: IconData[];
}

const SocialList: FC<SocialListProps> = ({ className, list }) => {
  return (
    <ul className={cn(styles.socialList, className)}>
      {list.map((item) => {
        return (
          <div key={item.link} className={styles.item}>
            <IconSocial icon={item.icon} name={item.name} link={item.link} />
          </div>
        );
      })}
    </ul>
  );
};

export default SocialList;
