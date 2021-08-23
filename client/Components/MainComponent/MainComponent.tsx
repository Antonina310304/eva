import React, { FC, memo, HTMLAttributes } from 'react';

import Breadcrumbs from '@Components/Breadcrumbs';
import { BreadcrumbData } from '@Types/Breadcrumbs';
import Container from '@Components/Container';
import MainTitle from '@Components/MainTitle/MainTitle';
import styles from './MainComponent.module.css';

export interface MainComponentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  breadcrumbs?: BreadcrumbData[];
}

const MainComponent: FC<MainComponentProps> = ({ children, breadcrumbs }) => {
  return (
    <div className={styles.MainComponent}>
      <Container>
        <div className={styles.top}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <MainTitle title='компонент заголовка' />
        <div className={styles.content}>{children}</div>
      </Container>
    </div>
  );
};

export default memo(MainComponent);
