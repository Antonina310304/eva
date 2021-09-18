import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import { ProductTagData } from '@Types/Product';
import styles from './Tag.module.css';

export interface TagsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  tag: ProductTagData;
}

const Tag: FC<TagsProps> = (props) => {
  const { className, tag, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.tag, className)}>
      <Image className={styles.image} src={tag.image.src} />
    </div>
  );
};

export default memo(Tag);
