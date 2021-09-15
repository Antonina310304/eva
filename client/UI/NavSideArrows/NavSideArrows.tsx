import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './NavSideArrows.module.css';

export interface NavSideArrowsProps extends HTMLAttributes<HTMLDivElement> {
  onPrev: () => void;
  onNext: () => void;
}

const NavSideArrows: FC<NavSideArrowsProps> = ({ onPrev, onNext }) => {
  return (
    <>
      <button type='button' className={cn(styles.arrow, styles.prev)} onClick={onPrev}>
        Назад
      </button>
      <button type='button' className={cn(styles.arrow, styles.next)} onClick={onNext}>
        Вперед
      </button>
    </>
  );
};

export default memo(NavSideArrows);
