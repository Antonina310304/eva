import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Link from '@UI/Link';
import styles from './Document.module.css';

export interface DocumentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon: string;
  name: string;
  sizeInfo: string;
  url: string;
}

const Document: FC<DocumentProps> = (props) => {
  const { className, icon, name, sizeInfo, url, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.document, className)}>
      <Image className={styles.icon} src={icon} />
      <Link to={url} className={styles.link} download target='_blank' view='native' size='s'>
        {name}
      </Link>
      <span className={styles.sizeInfo}>{sizeInfo}</span>
    </div>
  );
};

export default memo(Document);
