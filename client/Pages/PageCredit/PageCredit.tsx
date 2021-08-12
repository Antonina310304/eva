import React, { FC, HTMLAttributes, memo } from 'react';

import { MetaData } from '@Types/Meta';
import styles from './PageWarranty.module.css';

export interface PageCreditProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: нужно типизировать
  page: any;
  meta: MetaData;
}

const PageCredit: FC<PageCreditProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return <div>PageCredit</div>;
};

export default memo(PageCredit);
