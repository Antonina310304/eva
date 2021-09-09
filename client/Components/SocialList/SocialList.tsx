import React, { FC, HTMLAttributes } from 'react';
import IconSocial from '@UI/IconSocial/IconSocial';
import cn from 'classnames';
import styles from './SocialList.module.css';
import socialList from './data';

export interface SocialListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SocialList: FC<SocialListProps> = ({ className }) => {
  return (
    <ul className={cn(styles.socialList, className)}>
      {socialList.map((item) => {
        return (
          <div key={item.link} className={styles.item}>
            <IconSocial target={item.target} icon={item.icon} name={item.name} link={item.link} />
          </div>
        );
      })}
    </ul>
  );
};

export default SocialList;
