import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import { PublicationData } from '@Types/Press';
import Image from '@UI/Image';
import styles from './Publication.module.css';

export interface PublicationProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  publication: PublicationData;
}

const Publication: FC<PublicationProps> = (props) => {
  const { className, publication, ...restProps } = props;

  const handleClick = useCallback(() => {}, []);

  return (
    <div {...restProps} className={cn(styles.article, className)} onClick={handleClick}>
      <Image src={publication.image} className={styles.image} />
      <div className={styles.title}>{publication.title}</div>
      <div className={styles.date}>{publication.date}</div>
    </div>
  );
};

export default memo(Publication);
