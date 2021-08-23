import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { PageQualityDepartmentData } from './typings';
import styles from './PageQualityDepartment.module.css';

export interface PageQualityDepartmentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: Типизируй меня полностью
  page: PageQualityDepartmentData;
}

const PageQualityDepartment: FC<PageQualityDepartmentProps> = (props) => {
  const { className, page, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PageQualityDepartment
    </div>
  );
};

export default memo(PageQualityDepartment);
