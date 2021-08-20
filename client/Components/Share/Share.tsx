import React, { FC, HTMLAttributes, memo, useCallback, useMemo } from 'react';
import cn from 'classnames';

import { InstapaperShareButton, FacebookShareButton, VKShareButton } from 'react-share';

import { MetaDataSocial } from '@Types/Meta';
import styles from './Share.module.css';

export interface ShareProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  socials: MetaDataSocial[];
}

const Share: FC<ShareProps> = (props) => {
  const { className, socials, ...restProps } = props;

  const getSocialLink = useCallback(
    (socialId) => {
      return socials.find((social) => social.id === socialId).link;
    },
    [socials],
  );

  const socialsLink = useMemo(() => {
    return {
      facebook: getSocialLink('facebook'),
      instagram: getSocialLink('instagram'),
      vk: getSocialLink('vk'),
    };
  }, [getSocialLink]);

  return (
    <div {...restProps} className={cn(styles.share, className)}>
      <InstapaperShareButton url={socialsLink.instagram} className={styles.shareButton}>
        <div className={styles.instaIcon} />
      </InstapaperShareButton>
      <FacebookShareButton url={socialsLink.facebook} className={styles.shareButton}>
        <div className={styles.faceBookIcon} />
      </FacebookShareButton>
      <VKShareButton url={socialsLink.vk} className={styles.shareButton}>
        <div className={styles.VKIcon} />
      </VKShareButton>
    </div>
  );
};

export default memo(Share);
