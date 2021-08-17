import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import { PageContactsData } from './typings';
import styles from './PageContacts.module.css';

export interface PageContactsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageContactsData;
  meta: MetaData;
}

const PageContacts: FC<PageContactsProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PageContacts
    </div>
  );
};

export default memo(PageContacts);
