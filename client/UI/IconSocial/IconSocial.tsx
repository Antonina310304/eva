import React, { FC, memo, HTMLAttributes } from 'react';

import cn from 'classnames';

import Link from '@UI/Link';

import { IconSocialId } from '@Types/IconSocial';
import styles from './IconSocial.module.css';

export interface IconSocialProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon: IconSocialId;
  link: string;
  name: string;
  target?: string;
}

const IconSocial: FC<IconSocialProps> = ({ icon, name, link, target }) => {
  return (
    <Link
      view='simple'
      to={link}
      className={cn(styles.icon, {
        [styles.dzen]: icon === 'dzen',
        [styles.tiktok]: icon === 'tiktok',
        [styles.vk]: icon === 'vk',
        [styles.facebook]: icon === 'facebook',
        [styles.youtube]: icon === 'youtube',
        [styles.instagram]: icon === 'instagram',
      })}
      target={target}
    >
      {name}
    </Link>
  );
};

export default memo(IconSocial);
