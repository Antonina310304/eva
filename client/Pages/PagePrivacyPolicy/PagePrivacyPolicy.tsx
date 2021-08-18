import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PagePrivacyPolicy.module.css';

export interface PagePrivacyPolicyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PagePrivacyPolicy: FC<PagePrivacyPolicyProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      PagePrivacyPolicy
    </div>
  );
};

export default memo(PagePrivacyPolicy);
