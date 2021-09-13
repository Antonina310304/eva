import React from 'react';
import cn from 'classnames';
import styles from './NavSideArrows.module.css';

const NavSideArrows = ({ onPrev, onNext }) => {
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

export default NavSideArrows;
