import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { PageOfertaData } from './typings';
import styles from './PageOferta.module.css';

export interface PageOfertaProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageOfertaData;
}

const PageOferta: FC<PageOfertaProps> = (props) => {
  const { className, page, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <div className={styles.wrapper}>
        {/* eslint-disable-next-line react/no-danger */}
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </div>
  );
};

export default memo(PageOferta);
