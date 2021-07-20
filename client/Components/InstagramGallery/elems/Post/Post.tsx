import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import { InstagramPostData } from '@Types/InstagramPost';
import styles from './Post.module.css';

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  post: InstagramPostData;
}

const Post: FC<PostProps> = (props) => {
  const { className, post, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.post, className)}>
      <Image className={styles.image} src={post.img} />
      {post.author && <div className={styles.author}>{`@${post.author}`}</div>}
    </div>
  );
};

export default memo(Post);
