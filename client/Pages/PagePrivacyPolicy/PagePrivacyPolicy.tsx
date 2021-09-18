import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { PagePrivacyPolicyData } from './typings';
import styles from './PagePrivacyPolicy.module.css';

export interface PagePrivacyPolicyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PagePrivacyPolicyData;
}

const PagePrivacyPolicy: FC<PagePrivacyPolicyProps> = (props) => {
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

export default memo(PagePrivacyPolicy);
