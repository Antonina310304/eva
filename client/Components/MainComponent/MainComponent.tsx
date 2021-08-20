import React, { FC, memo, HTMLAttributes } from 'react';

import Breadcrumbs from '@Components/Breadcrumbs';
import { BreadcrumbData } from '@Types/Breadcrumbs';
import Container from '@Components/Container';
import styles from './MainComponent.module.css';

export interface MainComponentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  breadcrumbs?: BreadcrumbData[];
}

const MainComponent: FC<MainComponentProps> = ({ children, breadcrumbs }) => {
  return (
    <div className={styles.MainComponent}>
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1>компонент заголовка</h1>
        {children}
      </Container>
    </div>
  );
};

export default memo(MainComponent);
