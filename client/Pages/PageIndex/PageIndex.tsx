import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import MainComponent from '@Components/MainComponent';
import Footer from '@Components/Footer';

import Header from '@Components/Header';
import mockBreadcrumbsItems from './mocks';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <Header />
      <MainComponent breadcrumbs={mockBreadcrumbsItems} />
      <Footer />
    </div>
  );
};

export default memo(PageIndex);
