import React, { FC, memo, HTMLAttributes } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import styles from './IconSocial.module.css';

export interface IconSocialProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type: string;
  link: string;
}

const IconSocial: FC<IconSocialProps> = (props) => {
  const { type, link } = props;

  return (
    <Link
      to={link}
      className={cn(styles.icon, {
        [styles.zen]: type === 'zen',
        [styles.tiktok]: type === 'tiktok',
        [styles.vk]: type === 'vk',
        [styles.facebook]: type === 'facebook',
        [styles.youtube]: type === 'youtube',
        [styles.instagram]: type === 'instagram',
      })}
      target='_blank'
    >
      {type}
    </Link>
  );
};

export default memo(IconSocial);
