import { FC, HTMLAttributes, MouseEvent } from 'react';
import cn from 'classnames';

import styles from './NavSideArrows.module.css';

export interface NavSideArrowsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onPrev?: (e: MouseEvent) => void;
  onNext?: (e: MouseEvent) => void;
}

const NavSideArrows: FC<NavSideArrowsProps> = (props) => {
  const { className, onPrev, onNext, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.arrows, className)}>
      <button type='button' className={cn(styles.arrow, styles.prev)} onClick={onPrev}>
        Назад
      </button>

      <button type='button' className={cn(styles.arrow, styles.next)} onClick={onNext}>
        Вперед
      </button>
    </div>
  );
};

export default NavSideArrows;
