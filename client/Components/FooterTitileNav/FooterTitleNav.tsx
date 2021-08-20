import React, { FC, HTMLAttributes, memo } from 'react';

import styles from './FooterTitleNav.module.css';

export interface FooterMiddleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

const FooterTitleNav: FC<FooterMiddleProps> = ({ title }) => {
  return <p className={styles.title}>{title}</p>;
};

export default memo(FooterTitleNav);
